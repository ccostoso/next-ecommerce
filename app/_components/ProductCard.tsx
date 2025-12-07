import { Product } from "@/lib/mocks";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

type ProductCardTypes = {
	product: Product;
};

export function ProductCard({ product }: ProductCardTypes) {
	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 dark:bg-gray-800">
			<figure className="relative aspect-video">
				<Image
					src={product.image}
					alt={product.name}
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					fill
				/>
			</figure>
			<h2 className="text-lg font-semibold dark:text-white">
				{product.name}
			</h2>
			<div className="text-gray-600 dark:text-gray-300">
				{formatPrice(product.price)}
			</div>
			<p className="text-gray-500 dark:text-gray-400 mb-4">
				{product.description}
			</p>
		</div>
	);
}
