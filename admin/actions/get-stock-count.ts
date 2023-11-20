import { getStockCnt } from "@/db/controllers/dashboardController";

export const getStockCount = async (storeId:string) => {
	const stockCount = await getStockCnt(storeId);

	return 	stockCount.count;
}

