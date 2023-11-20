import { getGraphRevnue } from "@/db/controllers/dashboardController";


interface GraphData {
	name:string
	total:number
};

type Revenue = { month: string; monthlyRevenue: number };


export const getGraphRevenue = async (storeId:string) => {
	const result = await getGraphRevnue(storeId);
	const paidOrders: Revenue[] = result[0]  as any as Revenue[];
	const graphData : GraphData[] = [
		{name:"Jan" , total: 0},
		{name:"Feb" , total: 0},
		{name:"Mar" , total: 0},
		{name:"Apr" , total: 0},
		{name:"May" , total: 0},
		{name:"Jun" , total: 0},
		{name:"Jul" , total: 0},
		{name:"Aug" , total: 0},
		{name:"Sep" , total: 0},
		{name:"Oct" , total: 0},
		{name:"Nov" , total: 0},
		{name:"Dec" , total: 0},
	];

	for (const order of paidOrders) {
		const monthIndex = parseInt(order.month) - 1; // Months are zero-based in JavaScript
		if (monthIndex >= 0 && monthIndex < 12) {
			graphData[monthIndex].total = order.monthlyRevenue || 0;
		}
	}

	return graphData;
}

