import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { categories } from "./navbar";

export function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle className="text-lg font-semibold">
						Menu
					</SheetTitle>
				</SheetHeader>

				<nav className="flex flex-col gap-4 px-4">
					<SheetClose asChild>
						<Link href="/">Home</Link>
					</SheetClose>
					<SheetClose asChild>
						<Link href="/products">Products</Link>
					</SheetClose>

					<section>
						<h3 className="text-xs font-medium mb-2 mt-4 text-muted-foreground">
							Categories
						</h3>
						{categories.map((category) => (
							<SheetClose asChild key={category.id}>
								<Link
									href={category.href}
									className="block py-2 pl-4 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
								>
									{category.name}
								</Link>
							</SheetClose>
						))}
					</section>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
