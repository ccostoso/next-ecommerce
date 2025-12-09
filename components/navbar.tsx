import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const categories = [
	{ id: 1, name: "Electronics", href: "/category/electronics" },
	{ id: 2, name: "Clothing", href: "/category/clothing" },
	{ id: 3, name: "Home", href: "/category/home" },
];

export function Navbar() {
	return (
		<div className="border-b">
			<div className="container mx-auto p-4 flex items-center justify-between">
				<div className="flex items-center gap-6">
					<Link href="/" className="text-2xl font-bold">
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
				</div>
				<ModeToggle />
			</div>
		</div>
	);
}
