"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import { unstable_cache, updateTag } from "next/cache";

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

// ProductsCart type includes cart items with their associated products
export type ProductsCart = Prisma.CartGetPayload<{
	include: {
		items: {
			include: {
				product: true;
			};
		};
	};
}>;

// QuantifiedProductsCart extends ProductsCart with additional properties for size and subtotal
export type QuantifiedProductsCart = ProductsCart & {
	size: number;
	subtotal: number;
};

// ProductsCartItem type includes the associated product for each cart item
export type ProductsCartItem = Prisma.CartItemGetPayload<{
	include: {
		product: true;
	};
}>;

// Helper function to find cart from cookies
async function findCartFromCookies(): Promise<ProductsCart | null> {
	const cartId = (await cookies()).get("cartId")?.value;

	if (!cartId) return null;

	return unstable_cache(
		async (id: string) => {
			return await prisma.cart.findUnique({
				where: { id },
				include: {
					items: {
						include: {
							product: true,
						},
					},
				},
			});
		},
		[`cartId-${cartId}`],
		{
			tags: [`cart-${cartId}`],
		}
	)(cartId);
}

// Function to get the cart with size and subtotal calculations
export async function getQuantifiedProductsCart(): Promise<QuantifiedProductsCart | null> {
	const cart = await findCartFromCookies();

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

// Helper function to get or create a products cart
async function getOrCreateProductsCart(): Promise<ProductsCart> {
	let cart = await findCartFromCookies();

	if (cart) return cart;

	cart = await prisma.cart.create({
		data: {},
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	});

	(await cookies()).set("cartId", cart.id, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
	});

	return cart;
}

// Function to add a product to the products cart
export async function addProductToProductsCart(
	productId: string,
	quantity: number = 1
) {
	if (quantity < 1) {
		throw new Error("Quantity must be at least 1");
	}

	const cart = await getOrCreateProductsCart();

	// Check if the product is already in the cart
	let cartItem = cart.items.find((item) => item.productId === productId);

	if (cartItem) {
		// Update quantity if it exists
		cartItem = await prisma.cartItem.update({
			where: { id: cartItem.id },
			data: {
				quantity: cartItem.quantity + quantity,
			},
			include: {
				product: true,
			},
		});
	} else {
		// Create new cart item if it doesn't exist
		cartItem = await prisma.cartItem.create({
			data: {
				cartId: cart.id,
				productId,
				quantity,
			},
			include: {
				product: true,
			},
		});
	}

	// Revalidate pages
	updateTag(`cart-${cart.id}`);
}

export async function setProductsCartItemQuantity(
	productId: string,
	quantity: number
) {
	if (quantity < 0) {
		throw new Error("Quantity cannot be negative");
	}

	const cart = await findCartFromCookies();

	if (!cart) {
		throw new Error("No cart found");
	}

	// TODO: Ensure product inventory is sufficient

	try {
		if (quantity === 0) {
			// Remove item from cart entirely if quantity is set to 0
			await prisma.cartItem.deleteMany({
				where: {
					cartId: cart.id,
					productId,
				},
			});

			// Update cache tag to refresh cart quantity icon
			updateTag(`cart-${cart.id}`);
		} else {
			// Update the quantity of the cart item
			await prisma.cartItem.updateMany({
				where: {
					cartId: cart.id,
					productId,
				},
				data: {
					quantity,
				},
			});
		}
	} catch (error) {
		console.error("Error updating cart item quantity:", error);
		throw new Error("Failed to update cart item quantity");
	}
}
