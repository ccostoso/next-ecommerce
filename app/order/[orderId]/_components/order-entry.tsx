import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "@/lib/generated/prisma/client";

type OrderEntryProps = {
	orderItem: Prisma.OrderItemGetPayload<{
		include: { product: true };
	}>;
};

export function OrderEntry({ orderItem }: OrderEntryProps) {
	return (
		<li className="border-b border-muted flex py-4 justify-between">
			<div className="flex gap-4">
				<div className="relative w-16 h-16 overflow-hidden rounded-md border border-muted shrink-0 bg-muted aspect-square">
					{orderItem.product.image && (
						<Image
							src={orderItem.product.image!}
							alt={orderItem.product.name}
							fill
							sizes="64px"
							className="object-cover"
						/>
					)}
				</div>
				<div className="flex flex-col">
					<Link href={`/product/${orderItem.product.slug}`}>
						<h2 className="font-medium">
							{orderItem.product.name}
						</h2>
					</Link>
				</div>
			</div>

			<div className="flex flex-col justify-between items-end gap-2">
				<p className="font-medium">
					Price: {formatPrice(orderItem.product.price)}
				</p>

				<p className="text-center">Quantity: {orderItem.quantity}</p>
			</div>
		</li>
	);
}
