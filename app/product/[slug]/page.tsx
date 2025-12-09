import { getProductBySlug } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

type ProductPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export default async function ProductPage({ params }: ProductPageProps) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) return notFound();

	return (
		<main className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">{product.name}</h1>
			<p>{product.description}</p>
			<p>${formatPrice(product.price)}</p>
		</main>
	);
}
