import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { OrderEntry } from "./_components/order-entry";
import OrderSummary from "./_components/order-summary";

type OrderPageProps = {
	params: Promise<{
		orderId: string;
	}>;
};

export default async function OrderPage({ params }: OrderPageProps) {
	const { orderId } = await params;

	const order = await prisma.order.findUnique({
		where: { id: orderId },
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	});

	if (!order) notFound();

	return (
		<main className="container mx-auto p-4">
			<ul className="flex flex-col">
				{order.items.map((item) => (
					<OrderEntry key={item.id} orderItem={item} />
				))}
			</ul>

			<OrderSummary order={order} />
		</main>
	);
}
