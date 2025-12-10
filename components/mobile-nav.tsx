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
					<SheetTitle className="mb-4 text-lg font-semibold">
						Menu
					</SheetTitle>
				</SheetHeader>

				<nav className="flex flex-col gap-4 p-4">
					<SheetClose asChild>
						<Link
							href="/category/electronics"
							className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
						>
							Electronics
						</Link>
					</SheetClose>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
