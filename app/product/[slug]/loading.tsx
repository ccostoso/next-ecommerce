import { BreadcrumbsSkeleton } from "@/components/breadcrumbs-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
	return (
		<main className="container mx-auto p-4">
			<BreadcrumbsSkeleton />
			<Card>
				<CardContent className="p-6 grid grid-cols-1 gap-4 md:grid-cols-2">
					<figure className="relative rounded-lg overflow-hidden">
						<Skeleton className="w-full h-full" />
					</figure>
					<div>
						<Skeleton className="h-8 w-1/2 mb-2" />
						<div className="flex items-center gap-2 mb-4">
							<Skeleton className="h-6 w-20" />
							<Skeleton className="h-6 w-24" />
						</div>
						<Separator className="my-4" />
						<div className="space-y-2">
							<Skeleton className="h-5 w-1/4 mb-2" />
							<Skeleton className="h-4 w-full" />
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
