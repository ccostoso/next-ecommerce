"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchInput() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialQuery = searchParams.get("query") ?? "";
	const [query, setQuery] = useState(initialQuery);

	useEffect(() => {
		setQuery(initialQuery);
	}, [initialQuery]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();

		const trimmed = query.trim();
		const params = new URLSearchParams();

		if (trimmed) {
			params.append("query", trimmed);
			router.push(`/search?${params.toString()}`);
		} else {
			router.push(`/search`);
		}
	};

	return (
		<form className="relative w-full" onSubmit={handleSearch}>
			<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="text"
				placeholder="Search products..."
				className="pl-10 w-full"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</form>
	);
}
