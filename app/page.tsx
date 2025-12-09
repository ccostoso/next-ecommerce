import { ProductCard } from "./_components/ProductCard";
import prisma from "@/lib/prisma";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Suspense } from "react";
import { ProductsSkeleton } from "./_components/ProductsSkeleton";
import { getProductBySlug } from "@/lib/actions";
import { sleep } from "@/lib/utils";

const pageSize = 3;

type HomePageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
type ProductsProps = {
	page: number;
};

async function Products({ page }: ProductsProps) {
	const skip = (page - 1) * pageSize;

	const products = await prisma.product.findMany({
		skip,
		take: pageSize,
	});

	await sleep(1000);

	return (
		<>
			<p className="mb-4 text-gray-700 dark:text-gray-300">
				Showing {products.length} product
				{products.length !== 1 ? "s" : ""}
			</p>
			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</section>
		</>
	);
}

export default async function HomePage({ searchParams }: HomePageProps) {
	const { page: pageParam } = await searchParams;
	const page = Number(pageParam) || 1;

	const total = await prisma.product.count();
	const totalPages = Math.ceil(total / pageSize);

	return (
		<main className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Home</h1>

			<Suspense key={page} fallback={<ProductsSkeleton />}>
				<Products page={page} />
			</Suspense>

			<Pagination className="mt-8">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href={`?page=${page - 1}`}
							aria-disabled={page <= 1}
							className={
								page <= 1
									? "pointer-events-none opacity-50"
									: ""
							}
						/>
					</PaginationItem>

					{Array.from({ length: totalPages }).map((_, index) => {
						const pageNumber = index + 1;

						if (
							// Show first, last, current, and adjacent pages
							pageNumber === 1 ||
							pageNumber === totalPages ||
							(pageNumber >= page - 1 && pageNumber <= page + 1)
						) {
							return (
								<PaginationItem key={pageNumber}>
									<PaginationLink
										href={`?page=${pageNumber}`}
										isActive={pageNumber === page}
									>
										{pageNumber}
									</PaginationLink>
								</PaginationItem>
							);
						}

						return null;
					})}

					<PaginationItem>
						<PaginationNext
							href={`?page=${page + 1}`}
							aria-disabled={page >= totalPages}
							className={
								page >= totalPages
									? "pointer-events-none opacity-50"
									: ""
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</main>
	);
}
