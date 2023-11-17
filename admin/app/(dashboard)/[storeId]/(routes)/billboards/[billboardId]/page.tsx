import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/BillboardForm";
import { getBillboard } from "@/db/controllers/billboardApiController";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
	
	const billboard = await getBillboard(params.billboardId);

  return (
	<div className="flex-col">
		<div className="flex-1 space-y-4 pt-6 p-8">
			<BillboardForm initialData={billboard} />
		</div>
	</div>
  );
};

export default BillboardPage;