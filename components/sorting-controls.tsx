"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function SortingControls() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentSort = searchParams.get("sort");

	const createSortURL = (sortValue: string | null): string => {
		const params = new URLSearchParams(searchParams.toString());

		if (sortValue) {
			params.set("sort", sortValue);
		} else {
			params.delete("sort");
		}

		return `${pathname}?${params.toString()}`;
	};

	return (
		<div className="w-[125px] flex-none">
			<h3 className="text-sm text-muted-foreground mb-2">Sort</h3>
			<ul className="flex flex-col gap-2">
				<li>
					<Link
						href={createSortURL(null)}
						className={`${cn(
							"font-medium text-accent hover:text-primary",
							!currentSort
								? "font-semibold text-primary"
								: "text-muted-foreground"
						)}`}
					>
						Clear Sorting
					</Link>
				</li>
				<li>
					<Link
						href={createSortURL("price_asc")}
						className={`${cn(
							"font-medium text-accent hover:text-primary",
							currentSort === "price_asc"
								? "font-semibold text-primary"
								: "text-muted-foreground"
						)}`}
					>
						Price: Low to High
					</Link>
				</li>
				<li>
					<Link
						href={createSortURL("price_desc")}
						className={`${cn(
							"font-medium text-accent hover:text-primary",
							currentSort === "price_desc"
								? "font-semibold text-primary"
								: "text-muted-foreground"
						)}`}
					>
						Price: High to Low
					</Link>
				</li>
			</ul>
		</div>
	);
}
