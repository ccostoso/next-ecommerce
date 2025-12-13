import { BreadcrumbsItem, Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "../../_components/ProductCard";
import { sleep } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import { ProductsSkeleton } from "../../_components/ProductsSkeleton";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CategorySidebar } from "@/components/category-sidebar";

type CategoryPageProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ sort?: string }>;
};

type ProductsProps = {
	slug: string;
	sort?: string;
};

async function Products({ slug, sort }: ProductsProps) {
	let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

	if (sort === "price_asc") {
		orderBy = { price: "asc" };
	} else if (sort === "price_desc") {
		orderBy = { price: "desc" };
	}

	const products = await prisma.product.findMany({
		where: {
			category: {
				slug,
			},
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

export default async function CategoryPage({
	params,
	searchParams,
}: CategoryPageProps) {
	const { slug } = await params;
	const { sort } = await searchParams;

	const category = await prisma.category.findUnique({
		where: { slug },
		select: { name: true, slug: true },
	});

	if (!category) {
		return notFound();
	}

	const breadcrumbs: BreadcrumbsItem[] = [
		{ label: "Products", href: "/" },
		{
			label: category.name,
			href: `/search/${category.slug}`,
			active: true,
		},
	];

	return (
		<main className="container mx-auto p-4">
			<Breadcrumbs items={breadcrumbs} />

			<div className="flex gap-3 text-sm mb-8">
				<Link
					href={`/search/${category.slug}?sort=price_asc`}
					className="underline"
				>
					Sort by Price: Low to High
				</Link>
				<span>|</span>
				<Link
					href={`/search/${category.slug}?sort=price_desc`}
					className="underline"
				>
					Sort by Price: High to Low
				</Link>
			</div>

			<div className="flex gap-4">
				<Suspense
					fallback={
						<div className="w-[125px] flex-none">
							<p className="text-sm text-muted-foreground mb-2">
								Loading...
							</p>
						</div>
					}
				>
					<CategorySidebar activeCategory={slug} />
				</Suspense>
				<div className="flex-1">
					<Suspense
						key={`${slug}-${sort}`}
						fallback={<ProductsSkeleton />}
					>
						<Products slug={slug} sort={sort} />
					</Suspense>
				</div>
			</div>
		</main>
	);
}
