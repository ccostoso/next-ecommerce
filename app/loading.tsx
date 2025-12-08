import { ProductCardSkeleton } from "@/app/_components/ProductCardSkeleton";

export default function Loading() {
	return (
		// <main className="flex items-center justify-center h-screen">
		// 	<div className="w-20 h-20 border-y-2 border-gray-800 rounded-full animate-spin"></div>
		// </main>
		<main className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Home</h1>
			<p className="mb-4 text-gray-700 dark:text-gray-300">
				Showing 6 products
			</p>
			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, index) => (
					<ProductCardSkeleton key={index} />
				))}
			</section>
		</main>
	);
}
