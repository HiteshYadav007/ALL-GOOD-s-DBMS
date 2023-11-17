import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/CategoryForm";
import { getCategory } from "@/db/controllers/categoryApiController";
import { getAllBillboards } from "@/db/controllers/billboardApiController";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string , storeId:string };
}) => {
	
	const category = await getCategory(params.categoryId);

	const billboards = await getAllBillboards(params.storeId);

  return (
	<div className="flex-col">
		<div className="flex-1 space-y-4 pt-6 p-8">
			<CategoryForm initialData={category} billboards={billboards} />
		</div>
		
	</div>
  );
};

export default CategoryPage;