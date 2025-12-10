import { ProductsSkeleton } from "./_components/ProductsSkeleton";

export default function Loading() {
	return (
		<main className="container mx-auto p-4">
			<ProductsSkeleton />
		</main>
	);
}
