import { CategorySidebar } from "@/components/category-sidebar";
import { ReactNode, Suspense } from "react";

type SearchLayoutProps = Readonly<{
	children: ReactNode;
}>;

export default function SearchLayout({ children }: SearchLayoutProps) {
	return (
		<main className="container mx-auto p-4">
			<div className="flex gap-8">
				Categories
				{/* <Suspense
					fallback={
						<div className="w-[125px] flex-none">
							<p className="text-sm text-muted-foreground mb-2">
								Loading...
							</p>
						</div>
					}
				>
					<CategorySidebar />
				</Suspense> */}
				<div className="flex-1">{children}</div>
				<div className="w-[125px] flex-none">Sorting</div>
			</div>
		</main>
	);
}
