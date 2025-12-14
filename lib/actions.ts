"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "./prisma";

export type GetProductsParams = {
	query?: string;
	categorySlug?: string;
	sort?: string;
	page?: number;
	pageSize?: number;
};

export async function getProducts({
	query,
	categorySlug,
	sort,
	page = 1,
	pageSize = 18,
}: GetProductsParams) {
	const where: Prisma.ProductWhereInput = {};

	// Add search query filtering
	if (query) {
		where.OR = [
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
		];
	}

	let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

	// Determine sorting order
	if (sort === "price_asc") {
		orderBy = { price: "asc" };
	} else if (sort === "price_desc") {
		orderBy = { price: "desc" };
	}

	// Add category filtering
	if (categorySlug) {
		where.category = { slug: categorySlug };
	}

	// Calculate pagination parameters
	const skip = pageSize ? (page - 1) * pageSize : undefined;
	const take = pageSize;

	// Fetch products with pagination, filtering, and sorting
	const products = await prisma.product.findMany({
		where,
		orderBy,
		skip: skip,
		take: take,
	});

	return products;
}

export async function getProductBySlug(slug: string) {
	const product = await prisma.product.findUnique({
		where: { slug },
		include: {
			category: true,
		},
	});

	if (!product) return null;

	return product;
}
