import { Skeleton } from "./skeleton";

export function BreadcrumbsSkeleton() {
	return (
		<div className="mb-6 flex items-center gap-2">
			<Skeleton className="h-4 w-4 rounded-full" />
			<Skeleton className="h-4 w-1/9 rounded-full" />
			<Skeleton className="h-4 w-1/7 rounded-full" />
		</div>
	);
}
