import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { SearchInput } from "./search-input";

export const categories = [
	{ id: 1, name: "Electronics", href: "/search/electronics" },
	{ id: 2, name: "Clothing", href: "/search/clothing" },
	{ id: 3, name: "Home", href: "/search/home" },
];

export function Navbar() {
	return (
		<div className="border-b border-dashed border-border">
			<div className="container mx-auto p-4 flex items-center gap-6">
				{/* Logo and Category Navigation */}
				{/* Won't shrink because of `.shrink-0` */}
				<div className="flex items-center gap-6 shrink-0">
					{/* Logo/Link to Home */}
					<Link
						href="/"
						className="text-2xl font-bold hidden md:block whitespace-nowrap"
					>
						Next-Commerce
					</Link>

					{/* Category Navigation */}
					<nav className="hidden md:flex items-center gap-6">
						{categories.map((category) => (
							<Link
								key={category.id}
								href={category.href}
								className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
							>
								{category.name}
							</Link>
						))}
					</nav>

					{/* Mobile Navigation */}
					<MobileNav />
				</div>

				{/* Search Input */}
				{/* Will fill available space because of `.flex-1` */}
				{/* `min-w-0` permits shrinking when space is tight and text overflows */}
				<div className="block flex-1 min-w-0">
					<SearchInput />
				</div>

				{/* Action Buttons */}
				{/* Won't shrink because of `.shrink-0` */}
				<div className="flex items-center gap-0 shrink-0">
					<Button variant="ghost" size="icon" asChild>
						<Link href="/cart">
							<ShoppingCart />
						</Link>
					</Button>

					<ModeToggle />
				</div>
			</div>
		</div>
	);
}
