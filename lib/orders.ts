"use server";

import { getQuantifiedProductsCart } from "./actions";

export async function createOrder() {
	const cart = await getQuantifiedProductsCart();

	if (!cart || cart.size === 0) {
		throw new Error("Cart is empty");
	}
}
