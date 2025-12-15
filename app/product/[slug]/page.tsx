import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/actions";
import { formatPrice, sleep } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AddToCartButton } from "./_components/AddToCartButton";

type ProductPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata({ params }: ProductPageProps) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) {
		return {
			title: "Product Not Found",
		};
	}

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: product.name,
			description: product.description,
			images: product.image ? [{ url: product.image }] : [],
		},
	};
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) return notFound();

	const breadcrumbItems = [
		{ label: "Products", href: "/", active: false },
		{
			label: product.category.name,
			href: `/search/${product.category?.slug}`,
			active: false,
		},
		{ label: product.name, href: `/product/${product.slug}`, active: true },
	];

	await sleep(1000);

	return (
		<main className="container mx-auto p-4">
			<Breadcrumbs items={breadcrumbItems} />
			<Card>
				<CardContent className="p-6 grid grid-cols-1 gap-8 md:grid-cols-2">
					<figure className="relative rounded-lg overflow-hidden aspect-video">
						{product.image && (
							<Image
								src={product.image}
								alt={product.name}
								className="object-cover w-full h-full"
								sizes="(max-width: 768px) 100vw, 50vw"
								fill
								priority
							/>
						)}
					</figure>
					<div>
						<h1 className="text-3xl font-bold mb-2">
							{product.name}
						</h1>
						<div className="flex items-center gap-2 mb-4">
							<span className="font-semibold text-lg">
								{formatPrice(product.price)}
							</span>

							<Badge variant="outline">
								{product.category?.name}
							</Badge>
						</div>

						<Separator className="my-4" />
						<div className="space-y-2">
							<h2 className="font-medium">Description</h2>
							<p>{product.description}</p>
						</div>

						<Separator className="my-4" />
						<div className="space-y-2">
							<h2 className="font-medium">Availability</h2>
							<div className="flex items-center gap-2">
								{product.inventory > 0 ? (
									<Badge
										variant="outline"
										className="bg-green-100 text-green-800"
									>
										In Stock
									</Badge>
								) : (
									<Badge
										variant="outline"
										className="bg-red-100 text-red-800"
									>
										Out of Stock
									</Badge>
								)}

								<span className="text-xs text-gray-600">
									{product.inventory} items available
								</span>
							</div>
						</div>

						<Separator className="my-4" />
						<AddToCartButton product={product} />
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
