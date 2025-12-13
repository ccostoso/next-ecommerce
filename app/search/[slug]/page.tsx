import { BreadcrumbsItem, Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "../../_components/ProductCard";
import { sleep } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import { ProductsSkeleton } from "../../_components/ProductsSkeleton";
import { notFound } from "next/navigation";

type CategoryPageProps = {
	params: Promise<{ slug: string }>;
};

type ProductsProps = {
	slug: string;
};

async function Products({ slug }: ProductsProps) {
	const products = await prisma.product.findMany({
		where: {
			category: {
				slug,
			},
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

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { slug } = await params;

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

			<Suspense key={category.slug} fallback={<ProductsSkeleton />}>
				<Products slug={category.slug} />
			</Suspense>
		</main>
	);
}
