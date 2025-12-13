import { CategorySidebar } from "@/components/category-sidebar";
import { SortingControls } from "@/components/sorting-controls";
import { prisma } from "@/lib/prisma";
import { ReactNode, Suspense } from "react";

type SearchLayoutProps = Readonly<{
	children: ReactNode;
}>;

async function CategorySidebarServerWrapper() {
	const categories = await prisma.category.findMany({
		select: { name: true, slug: true },
		orderBy: { name: "asc" },
	});

	return <CategorySidebar categories={categories} />;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
	return (
		<main className="container mx-auto p-4">
			<div className="flex gap-8">
				<Suspense
					fallback={
						<div className="w-[125px] flex-none">
							<p className="text-sm text-muted-foreground mb-2">
								Loading...
							</p>
						</div>
					}
				>
					<CategorySidebarServerWrapper />
				</Suspense>
				<div className="flex-1">{children}</div>
				<SortingControls />
			</div>
		</main>
	);
}
