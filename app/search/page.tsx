import { BreadcrumbsItem, Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "../_components/ProductCard";
import { sleep } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import { ProductsSkeleton } from "../_components/ProductsSkeleton";

type SearchPageProps = {
	searchParams: Promise<{ query?: string }>;
};

type ProductsProps = {
	query: string;
};

async function Products({ query }: ProductsProps) {
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

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { query } = await searchParams;
	const trimmed = query?.trim() ?? "";

	const breadcrumbs: BreadcrumbsItem[] = [
		{ label: "Products", href: "/" },
		{ label: "Search", href: "/search" },
	];

	trimmed &&
		breadcrumbs.push({
			label: `Results for "${trimmed}"`,
			href: `/search?query=${encodeURIComponent(trimmed)}`,
			active: true,
		});

	return (
		<main className="container mx-auto p-4">
			<Breadcrumbs items={breadcrumbs} />

			<Suspense key={query} fallback={<ProductsSkeleton />}>
				<Products query={trimmed} />
			</Suspense>
		</main>
	);
}
