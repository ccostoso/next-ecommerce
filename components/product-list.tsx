import { ProductCard } from "@/app/_components/ProductCard";
import { Product } from "@/app/generated/prisma/client";

type ProductsListProps = {
	products: Product[];
};

export function ProductsList({ products }: ProductsListProps) {
	if (products.length === 0) {
		return (
			<p className="text-center text-muted-foreground">
				No products found.
			</p>
		);
	}

	return (
		<>
			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</section>
		</>
	);
}
