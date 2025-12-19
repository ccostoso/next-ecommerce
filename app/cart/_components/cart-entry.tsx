"use client";

import { ProductsCartItem, setProductsCartItemQuantity } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type CartEntryProps = {
	cartItem: ProductsCartItem;
	index: number;
};

export function CartEntry({ cartItem, index }: CartEntryProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleSetProductQuantity = async (quantity: number) => {
		try {
			setIsLoading(true);
			// Call server action to increment quantity
			await setProductsCartItemQuantity(cartItem.product.id, quantity);
		} catch (error) {
			console.error("Failed to change product quantity:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<li className="border-b border-muted flex py-4 justify-between">
			<div className="flex gap-4">
				<div className="absolute z-10 -ml-1 -mt-2">
					<Button
						variant="ghost"
						size="icon"
						disabled={isLoading}
						className="w-7 h-7 rounded-full bg-muted text-muted-foreground hover:bg-muted-foreground"
						onClick={() => handleSetProductQuantity(0)}
					>
						<X className="w-4 h-4" />
					</Button>
				</div>

				<div className="relative w-16 h-16 overflow-hidden rounded-md border border-muted shrink-0 bg-muted aspect-square">
					{cartItem.product.image && (
						<Image
							src={cartItem.product.image!}
							alt={cartItem.product.name}
							fill
							sizes="64px"
							className="object-cover"
						/>
					)}
				</div>
				<div className="flex flex-col">
					<Link href={`/product/${cartItem.product.slug}`}>
						<h2 className="font-medium">{cartItem.product.name}</h2>
					</Link>
				</div>
			</div>

			<div className="flex flex-col justify-between items-end gap-2">
				<p className="font-medium">
					Price: {formatPrice(cartItem.product.price)}
				</p>
				<div className="flex items-center border border-muted rounded-full">
					<Button
						variant="ghost"
						className="rounded-l-full"
						onClick={() =>
							handleSetProductQuantity(cartItem.quantity - 1)
						}
						disabled={isLoading}
					>
						<Minus className="w-4 h-4" />
					</Button>
					<p className="w-6 text-center">{cartItem.quantity}</p>
					<Button
						variant="ghost"
						className="rounded-r-full"
						onClick={() =>
							handleSetProductQuantity(cartItem.quantity + 1)
						}
						disabled={isLoading}
					>
						<Plus className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</li>
	);
}
