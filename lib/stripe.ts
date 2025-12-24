import { Prisma } from "@/lib/generated/prisma/client";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error(
		"STRIPE_SECRET_KEY is not defined in environment variables"
	);
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2025-12-15.clover",
	typescript: true,
});

export type ItemsProductsOrder = Prisma.OrderGetPayload<{
	include: {
		items: {
			include: {
				product: true;
			};
		};
	};
}>;

export async function createCheckoutSession(order: ItemsProductsOrder) {
	if (!order.items || order.items.length === 0) {
		throw new Error("Order has no items");
	}

	const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
		order.items.map((item) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: item.product.name,
					description: item.product.description || undefined,
					images: item.product.image ? [item.product.image] : [],
				},
				unit_amount: Math.round(item.price * 100), // amount in cents
			},
			quantity: item.quantity,
		}));

	const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
	const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}`;

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: successUrl,
			cancel_url: cancelUrl,
			metadata: {
				orderId: order.id,
			},
		});

		return { sessionId: session.id, sessionUrl: session.url };
	} catch (error) {
		throw new Error("Failed to create Stripe checkout session");
	}
}
