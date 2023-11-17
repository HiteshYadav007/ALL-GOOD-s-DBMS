import prismadb from "@/lib/prismadb";
import ProductForm from "./components/ProductForm";
import { getProduct } from "@/db/controllers/productApiController";
import { getAllCategories } from "@/db/controllers/categoryApiController";
import { getAllSizes } from "@/db/controllers/sizeApiController";

const ProductPage = async ({
  params,
}: {
  params: { productId: string , storeId : string };
}) => {
	
	const product = await getProduct(params.productId);

	const categories = (await getAllCategories(params.storeId));


	const sizes = (await getAllSizes(params.storeId));

  return (
	<div className="flex-col">
		<div className="flex-1 space-y-4 pt-6 p-8">
			<ProductForm 
				initialData={product} 
				categories={categories}
				sizes = {sizes}
				/>
		</div>
	</div>
  );
};

export default ProductPage;