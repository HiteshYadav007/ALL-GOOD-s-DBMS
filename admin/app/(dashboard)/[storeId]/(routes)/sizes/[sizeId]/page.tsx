import prismadb from "@/lib/prismadb";
import SizeForm from "./components/SizeForm";
import { getSize } from "@/db/controllers/sizeApiController";

const SizePage = async ({
  params,
}: {
  params: { sizeId: string };
}) => {
	
	const size = await getSize(params.sizeId);

  return (
	<div className="flex-col">
		<div className="flex-1 space-y-4 pt-6 p-8">
			<SizeForm initialData={size} />
		</div>
	</div>
  );
};

export default SizePage;