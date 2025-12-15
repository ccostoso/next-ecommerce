"use client";

import { Product } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { addProductToProductsCart } from "@/lib/actions";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

type AddToCartButtonProps = {
	product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
	const [isAdding, setIsAdding] = useState(false);

	const handleAddToCart = async () => {
		try {
			setIsAdding(true);
			await addProductToProductsCart(product.id);
		} catch (error) {
			console.error("Error adding to cart:", error);
		} finally {
			setIsAdding(false);
		}
	};

	return (
		<Button
			onClick={handleAddToCart}
			disabled={isAdding || product.inventory === 0}
			className="w-full mt-4 hover:bg-primary/70"
		>
			<ShoppingCart className="mr-1 w-4 h-4" />
			{isAdding
				? "Adding..."
				: product.inventory === 0
				? "Out of Stock"
				: "Add to Cart"}
		</Button>
	);
}
