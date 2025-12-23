import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { notFound, redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const sessionId = searchParams.get("session_id");

	if (!sessionId) notFound();

	let orderId: string | undefined;

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		const orderId = session.metadata?.orderId;

		if (!orderId) notFound();

		const order = await prisma.order.findUnique({
			where: { id: orderId, stripeSessionId: sessionId },
		});

		if (!order) notFound();

		if (order.status === "PENDING_PAYMENT") {
			await prisma.order.update({
				where: { id: order.id },
				data: { status: "PENDING", stripeSessionId: null },
			});
		}
	} catch (error) {
		console.error("Error retrieving session or order:", error);
		notFound();
	}

	return orderId ? redirect(`/order/${orderId}`) : notFound();
}
