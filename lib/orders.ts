"use server";

import { cookies } from "next/headers";
import { getQuantifiedProductsCart } from "./actions";
import prisma from "./prisma";

export async function createOrder() {
	const cart = await getQuantifiedProductsCart();

	if (!cart || cart.size === 0) {
		throw new Error("Cart is empty");
	}

	try {
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

		// Clear cartId cookie
		(await cookies()).delete("cartId");

		// Return the order
		return order;
	} catch (error) {
		throw new Error("Failed to create order");
	}
}
