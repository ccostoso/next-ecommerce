import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export function SearchInput() {
	return (
		<form className="relative w-full">
			<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="text"
				placeholder="Search products..."
				className="pl-10 w-full"
			/>
		</form>
	);
}
