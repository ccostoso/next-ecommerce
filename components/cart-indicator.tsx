import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { getQuantifiedProductsCart } from "@/lib/actions";
import { sleep } from "@/lib/utils";

export async function CartIndicator() {
	const cart = await getQuantifiedProductsCart();
	const { size } = cart || { size: 0 };

	await sleep(1000);

	return (
		<Button className="relative" variant="ghost" size="icon" asChild>
			<Link href="/cart">
				<ShoppingCart />
				{size > 0 && (
					<span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
						{size}
					</span>
				)}
			</Link>
		</Button>
	);
}
