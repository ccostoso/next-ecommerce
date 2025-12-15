import { getQuantifiedProductsCart } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";

export default async function CartPage() {
	const cart = await getQuantifiedProductsCart();

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
				<div className="space-y-4">
					{cart.items.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between border-b pb-4"
						>
							<div>
								<h2 className="text-lg font-medium">
									{item.product.name}
								</h2>
								<p className="text-sm text-muted-foreground">
									{item.product.description}
								</p>
							</div>
							<div>
								<p className="text-lg font-bold">
									Price: {formatPrice(item.product.price)}
								</p>
							</div>
						</div>
					))}
					<div className="text-right font-bold text-xl">
						Total: ${cart.subtotal.toFixed(2)}
					</div>
				</div>
			)}
		</main>
	);
}
