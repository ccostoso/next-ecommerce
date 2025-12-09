import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
	return (
		<Card className="pt-0 overflow-hidden ">
			<figure className="relative aspect-video">
				<Skeleton className="w-full h-full" />
			</figure>

			<CardHeader>
				<Skeleton className="h-4 w-1/2 mb-2" />
				<Skeleton className="h-6 w-3/4" />
			</CardHeader>

			<CardFooter>
				<Skeleton className="h-8 w-20 mt-4" />
			</CardFooter>
		</Card>
	);
}
