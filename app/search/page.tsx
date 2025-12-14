import { BreadcrumbsItem, Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "../_components/ProductCard";
import { sleep } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import { ProductsSkeleton } from "../_components/ProductsSkeleton";

type ProductsProps = {
	query: string;
	sort?: string;
};

async function Products({ query, sort }: ProductsProps) {
	let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

	if (sort === "price_asc") {
		orderBy = { price: "asc" };
	} else if (sort === "price_desc") {
		orderBy = { price: "desc" };
	}

	const products = await prisma.product.findMany({
		where: {
			OR: [
				{
					name: {
						contains: query,
						mode: "insensitive",
					},
				},
				{
					description: {
						contains: query,
						mode: "insensitive",
					},
				},
			],
		},
		...(orderBy ? { orderBy } : {}),
		take: 18,
	});

	await sleep(1000);

	if (products.length === 0) {
		return (
			<p className="text-center text-muted-foreground">
				No products found.
			</p>
		);
	}

	return (
		<>
			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</section>
		</>
	);
}

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
				<Products query={query} sort={sort} />
			</Suspense>
		</>
	);
}
