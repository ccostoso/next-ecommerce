import { BreadcrumbsItem, Breadcrumbs } from "@/components/breadcrumbs";
import { Suspense } from "react";
import { ProductsSkeleton } from "../_components/ProductsSkeleton";
import { ProductsListServerWrapper } from "@/components/products-list-server-wrapper";

type SearchPageProps = {
	searchParams: Promise<{ query?: string; sort?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const query = (await searchParams).query?.trim() ?? "";
	const sort = (await searchParams).sort;

	const breadcrumbs: BreadcrumbsItem[] = [{ label: "Products", href: "/" }];

	query &&
		breadcrumbs.push({
			label: `Results for "${query}"`,
			href: `/search?query=${encodeURIComponent(query)}`,
			active: true,
		});

	return (
		<>
			<Breadcrumbs items={breadcrumbs} />

			<Suspense key={`${query}-${sort}`} fallback={<ProductsSkeleton />}>
				<ProductsListServerWrapper params={{ query, sort }} />
			</Suspense>
		</>
	);
}
