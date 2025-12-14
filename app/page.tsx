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
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductListServerWrapper } from "@/components/product-list-server-wrapper";

const pageSize = 3;

type HomePageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
	const { page: pageParam } = await searchParams;
	const page = Number(pageParam) || 1;

	const total = await prisma.product.count();
	const totalPages = Math.ceil(total / pageSize);

	return (
		<main className="container mx-auto p-4">
			<Breadcrumbs
				items={[{ label: "Products", href: "/", active: true }]}
			/>
			<Suspense key={page} fallback={<ProductsSkeleton />}>
				<ProductListServerWrapper params={{ page, pageSize }} />
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
