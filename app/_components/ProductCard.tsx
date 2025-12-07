import { Product } from "@/app/generated/prisma/client";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

type ProductCardTypes = {
	product: Product;
};

export function ProductCard({ product }: ProductCardTypes) {
	return (
		<Card className="pt-0 overflow-hidden">
			<figure className="relative aspect-video">
				{product.image && (
					<Image
						src={product.image}
						alt={product.name}
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
					/>
				)}
			</figure>
			<CardHeader>
				<CardTitle>{product.name}</CardTitle>
				<CardDescription>{product.description}</CardDescription>
			</CardHeader>

			<CardFooter>
				<p>{formatPrice(product.price)}</p>
			</CardFooter>
		</Card>
	);
}
