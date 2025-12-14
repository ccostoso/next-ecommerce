"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/headers";

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

export type CartWithProducts = Prisma.CartGetPayload<{
	include: {
		items: {
			include: {
				product: true;
			};
		};
	};
}>;

export type ShoppingCart = CartWithProducts & {
	size: number;
	subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
	const cartId = (await cookies()).get("cartId")?.value;

	if (!cartId) return null;

	const cart = await prisma.cart.findUnique({
		where: { id: cartId },
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	});

	if (!cart) return null;

	// Calculate size and subtotal
	const size = cart.items.reduce((acc, item) => acc + item.quantity, 0);
	const subtotal = cart.items.reduce(
		(acc, item) => acc + item.quantity * item.product.price,
		0
	);

	return {
		...cart,
		size,
		subtotal,
	};
}
