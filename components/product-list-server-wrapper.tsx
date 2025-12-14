import { getProducts, GetProductsParams } from "@/lib/actions";
import { ProductsList } from "./product-list";
import { sleep } from "@/lib/utils";

type ProductListServerWrapperProps = {
	params: GetProductsParams;
};

export async function ProductListServerWrapper({
	params,
}: ProductListServerWrapperProps) {
	await sleep(1000);
	const products = await getProducts(params);

	return <ProductsList products={products} />;
}
