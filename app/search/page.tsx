type SearchPageProps = {
	searchParams: Promise<{ query?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { query } = await searchParams;

	return (
		<main className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Search Results</h1>
			<p className="text-muted-foreground">
				{query ?? "No query provided"}
			</p>
		</main>
	);
}
