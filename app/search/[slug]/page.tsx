import { BreadcrumbsItem, Breadcrumbs } from "@/components/breadcrumbs";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import { ProductsSkeleton } from "../../_components/ProductsSkeleton";
import { notFound } from "next/navigation";
import { ProductListServerWrapper } from "@/components/product-list-server-wrapper";

type CategoryPageProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ sort?: string }>;
};

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
		<>
			<Breadcrumbs items={breadcrumbs} />

			<Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
				<ProductListServerWrapper
					params={{ categorySlug: slug, sort }}
				/>
			</Suspense>
		</>
	);
}
