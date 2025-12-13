import prisma from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import Link from "next/link";

type CategorySidebarProps = {
	activeCategory?: string;
};

export async function CategorySidebar({
	activeCategory,
}: CategorySidebarProps) {
	const categories = await prisma.category.findMany({
		select: { name: true, slug: true },
		orderBy: { name: "asc" },
	});

	await sleep(1000);

	return (
		<aside className="w-[125px] flex-none">
			<h3 className="text-sm text-muted-foreground mb-2">Collections</h3>

			<ul className="flex flex-col gap-2">
				{categories.map((category) => (
					<li key={category.slug}>
						<Link
							href={`/search/${category.slug}`}
							className={`font-medium text-accent hover:text-primary ${
								activeCategory === category.slug
									? "font-semibold text-primary"
									: "text-muted-foreground"
							}`}
						>
							{category.name}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
}
