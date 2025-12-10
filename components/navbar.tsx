import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";
import { MobileNav } from "./mobile-nav";

const categories = [
	{ id: 1, name: "Electronics", href: "/category/electronics" },
	{ id: 2, name: "Clothing", href: "/category/clothing" },
	{ id: 3, name: "Home", href: "/category/home" },
];

export function Navbar() {
	return (
		<div className="border-b border-dashed border-border">
			<div className="container mx-auto p-4 flex items-center justify-between">
				<div className="flex items-center gap-6">
					<Link
						href="/"
						className="text-2xl font-bold hidden md:block"
					>
						Next-Commerce
					</Link>
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

					<MobileNav />
				</div>
				<div className="flex items-center gap-0">
					<Button variant="ghost" size="icon" asChild>
						<Link href="/search">
							<Search />
						</Link>
					</Button>

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
