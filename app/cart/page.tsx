import { CartEntry } from "@/app/cart/_components/cart-entry";
import { getQuantifiedProductsCart } from "@/lib/actions";
import CartSummary from "./_components/cart-summary";
import { sleep } from "@/lib/utils";

export default async function CartPage() {
	const cart = await getQuantifiedProductsCart();

	await sleep(1000); // Simulate loading delay

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
				</>
			)}
		</main>
	);
}
