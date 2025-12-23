import { getQuantifiedProductsCart } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";

export default async function CartSummary() {
	const cart = await getQuantifiedProductsCart();

	if (!cart || cart.size === 0) {
		return null;
	}

	const { subtotal } = cart;
	const taxes = subtotal * 0; // Example: 8.875% tax
	const shipping = 0; // Example: flat shipping rate
	const total = subtotal + taxes + shipping;

	return (
		<div className="flex flex-col mt-2">
			<div className="text-sm text-muted-foreground">
				<div className="flex items-center justify-between py-1 my-1">
					<p>Subtotal:</p>
					<p className="text-base text-foreground">
						{formatPrice(subtotal)}
					</p>
				</div>

				<div className="flex items-center justify-between py-1 my-1">
					<p>Taxes:</p>
					<p className="">Calculated at checkout</p>
				</div>

				<div className="flex items-center justify-between py-1 my-1 border-b border-muted">
					<p>Shipping:</p>
					<p className="">Calculated at checkout</p>
				</div>

				<div className="flex items-center justify-between py-1 my-1 font-semibold text-lg text-primary">
					<p>Total:</p>
					<p className="text-base text-foreground">
						{formatPrice(total)}
					</p>
				</div>
			</div>
		</div>
	);
}
