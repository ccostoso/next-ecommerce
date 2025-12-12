import { Product } from "@/app/generated/prisma/client";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import Link from "next/dist/client/link";
import Image from "next/image";

type ProductCardTypes = {
	product: Product;
};

export function ProductCard({ product }: ProductCardTypes) {
	return (
		<Link
			href={`/product/${product.slug}`}
			className="h-full min-h-[450px]"
		>
			<Card className="pt-0 overflow-hidden flex flex-col h-full min-h-[450px]">
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
					<CardDescription className="line-clamp-2">
						{product.description}
					</CardDescription>
				</CardHeader>

				<CardFooter className="mt-auto">
					<p>{formatPrice(product.price)}</p>
				</CardFooter>
			</Card>
		</Link>
	);
}
