"use server";

import { cookies } from "next/headers";
import { getQuantifiedProductsCart } from "./actions";
import prisma from "./prisma";
import { createCheckoutSession, ItemsProductsOrder } from "./stripe";

export type ProcessCheckoutResponse = {
	sessionUrl: string;
	order: ItemsProductsOrder;
};

export async function processCheckout(): Promise<ProcessCheckoutResponse> {
	const cart = await getQuantifiedProductsCart();

	if (!cart || cart.size === 0) {
		throw new Error("Cart is empty");
	}

	let orderId: string | null = null;

	try {
		// We use a transaction to ensure data integrity
		const order = prisma.$transaction(async (tx) => {
			// Calculate total price
			const total = cart.subtotal;

			// Create Order record
			const newOrder = await tx.order.create({
				data: {
					totalAmount: total,
				},
			});

			// Create OrderItems records
			const newOrderItems = cart.items.map((item) => ({
				orderId: newOrder.id,
				productId: item.product.id,
				quantity: item.quantity,
				price: item.product.price,
			}));

			await tx.orderItem.createMany({
				data: newOrderItems,
			});

			// Clear the cartItems
			await tx.cartItem.deleteMany({
				where: {
					cartId: cart.id,
				},
			});

			// Clear the cart
			await tx.cart.delete({
				where: {
					id: cart.id,
				},
			});

			return newOrder;
		});

		orderId = (await order).id;

		// Reload full order with items and products
		const fullOrder = await prisma.order.findUniqueOrThrow({
			where: { id: (await order).id },
			include: {
				items: {
					include: {
						product: true,
					},
				},
			},
		});

		// Create Stripe session
		const { sessionId, sessionUrl } = await createCheckoutSession(
			fullOrder
		);

		if (!sessionId || !sessionUrl)
			throw new Error("Failed to create Stripe checkout session");

		// Store Stripe session IDs in the order and change order status to 'PENDING_PAYMENT'
		await prisma.order.update({
			where: { id: fullOrder.id },
			data: {
				stripeSessionId: sessionId,
				status: "PENDING_PAYMENT",
			},
		});

		// Clear cartId cookie
		(await cookies()).delete("cartId");

		// Return the order
		return {
			sessionUrl,
			order: fullOrder,
		};
	} catch (error) {
		if (
			orderId &&
			error instanceof Error &&
			error.message.includes("Stripe")
		) {
			// If order was created but an error occurred later, mark it as 'FAILED'
			await prisma.order.update({
				where: { id: orderId },
				data: {
					status: "FAILED",
				},
			});
		}
		throw new Error("Failed to create order");
	}
}
