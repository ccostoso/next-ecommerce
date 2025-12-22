import { CartEntry } from "@/app/cart/_components/cart-entry";
import { getQuantifiedProductsCart } from "@/lib/actions";
import CartSummary from "./_components/cart-summary";
import { Button } from "@/components/ui/button";
import { processCheckout } from "@/lib/orders";
import { redirect } from "next/navigation";
import { ProcessCheckoutResponse } from "@/lib/orders";

export default async function CartPage() {
	const cart = await getQuantifiedProductsCart();

	const handleCheckout = async () => {
		"use server";

		let result: ProcessCheckoutResponse | null = null;

		try {
			result = await processCheckout();
		} catch (error) {
			console.error("Checkout failed:", error);
		}

		if (result) redirect(result.sessionUrl);
	};

	return (
		<main className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Your Cart</h1>
			{!cart || cart.size === 0 ? (
				<div className="text-center">
					<h2 className="text-2xl font-medium">
						Your cart is empty.
					</h2>
					<p className="text-muted-foreground">
						Looks like you haven't added anything to your cart yet.
					</p>
				</div>
			) : (
				<>
					<ul className="flex flex-col">
						{cart.items.map((item, index) => (
							<CartEntry
								key={item.id}
								cartItem={item}
								index={index}
							/>
						))}
					</ul>

					<CartSummary />

					<form action={handleCheckout}>
						<Button size="lg" className="w-full mt-4">
							Proceed to Checkout
						</Button>
					</form>
				</>
			)}
		</main>
	);
}
