import { totalRevnue } from "@/db/controllers/dashboardController";
import prismadb from "@/lib/prismadb"

export const getTotalRevenue = async (storeId:string) => {
	

	const totalRevenue = await totalRevnue(storeId);

	return totalRevenue.revenue;
}

