import { getProducts, GetProductsParams } from "@/lib/actions";
import { ProductsList } from "./products-list";
import { sleep } from "@/lib/utils";

type ProductsListServerWrapperProps = {
	params: GetProductsParams;
};

export async function ProductsListServerWrapper({
	params,
}: ProductsListServerWrapperProps) {
	await sleep(1000);
	const products = await getProducts(params);

	return <ProductsList products={products} />;
}
