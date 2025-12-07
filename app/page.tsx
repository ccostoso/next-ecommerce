import { Product } from "@/app/generated/prisma/client";
import { ProductCard } from "./_components/ProductCard";
import prisma from "@/lib/prisma";

export default async function HomePage() {
	const products: Product[] = await prisma.product.findMany();

	return (
		<main className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Home</h1>
			<p className="mb-4 text-gray-700 dark:text-gray-300">
				Showing {products.length} product
				{products.length !== 1 ? "s" : ""}
			</p>
			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</section>
		</main>
	);
}
