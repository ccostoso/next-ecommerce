import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductsSkeleton() {
	return (
		<>
			<Skeleton className="mb-4 h-8 w-48" />
			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<ProductCardSkeleton key={index} />
				))}
			</section>
		</>
	);
}
