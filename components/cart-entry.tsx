import { ProductsCartItem } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

type CartEntryProps = {
	cartItem: ProductsCartItem;
};

export function CartEntry({ cartItem }: CartEntryProps) {
	return (
		<li className="border-b border-muted flex py-4 justify-between">
			<div className="flex gap-4">
				<div className="relative w-16 h-16 overflow-hidden rounded-md border border-muted shrink-0 bg-muted">
					<Image
						className="object-cover"
						src={cartItem.product.image}
						alt={cartItem.product.name}
						fill
						sizes="64px"
					/>
				</div>
				<div className="flex flex-col">
					<h2 className="font-medium">{cartItem.product.name}</h2>
				</div>
			</div>

			<div className="flex flex-col justify-between items-end gap-2">
				<p className="font-medium">
					Price: {formatPrice(cartItem.product.price)}
				</p>
				<div className="flex items-center border border-muted rounded-full">
					<Button variant="ghost" className="rounded-l-full">
						<Minus className="w-4 h-4" />
					</Button>
					<p className="w-6 text-center">{cartItem.quantity}</p>
					<Button variant="ghost" className="rounded-r-full">
						<Plus className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</li>
	);
}
