"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

type Category = {
	name: string;
	slug: string;
};

type CategorySidebarProps = {
	categories: Category[];
};

export function CategorySidebar({ categories }: CategorySidebarProps) {
	const params = useParams();
	const activeCategory = params?.slug;

	return (
		<aside className="w-[125px] flex-none">
			<h3 className="text-sm text-muted-foreground mb-2">Collections</h3>

			<ul className="flex flex-col gap-2">
				{categories.map((category) => (
					<li key={category.slug}>
						<Link
							href={`/search/${category.slug}`}
							className={cn(
								"font-medium text-accent hover:text-primary",
								{
									"font-semibold text-primary":
										activeCategory === category.slug,
									"text-muted-foreground":
										activeCategory !== category.slug,
								}
							)}
						>
							{category.name}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
}
