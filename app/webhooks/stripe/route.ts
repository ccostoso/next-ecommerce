import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
	const payload = await request.text();
	const sig = request.headers.get("Stripe-Signature");

	if (!sig) {
		return new NextResponse("Missing Stripe signature", { status: 400 });
	}

	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

	if (!webhookSecret) {
		return new NextResponse("Something went wrong", {
			status: 500,
		});
	}

	try {
		const event = await stripe.webhooks.constructEventAsync(
			payload,
			sig,
			webhookSecret
		);

		if (event.type === "checkout.session.completed") {
			const session = event.data.object as Stripe.Checkout.Session;
			const orderId = session.metadata?.orderId;

			if (!orderId) {
				return new NextResponse(
					"Missing order ID in session metadata",
					{
						status: 400,
					}
				);
			}

			await prisma.order.update({
				where: { id: orderId },
				data: { status: "PAID" },
			});
		}
	} catch (error) {
		console.error("Error processing Stripe webhook:", error);
		return new NextResponse("Webhook error", { status: 400 });
	}

	return NextResponse.json(null, { status: 200 });
}
