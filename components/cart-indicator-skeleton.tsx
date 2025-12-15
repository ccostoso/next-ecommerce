import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export async function CartIndicatorSkeleton() {
	return (
		<Button
			className="relative opacity-50 cursor-wait"
			variant="ghost"
			size="icon"
			asChild
			disabled
		>
			<Link href="/cart">
				<ShoppingCart />
			</Link>
		</Button>
	);
}
