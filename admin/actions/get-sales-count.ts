import { getSalesCnts } from "@/db/controllers/dashboardController";

export const getSalesCount = async (storeId:string) => {
	const salesCount = await getSalesCnts(storeId);

	return 	salesCount.count;
}

