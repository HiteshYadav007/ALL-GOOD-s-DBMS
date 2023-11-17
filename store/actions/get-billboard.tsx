import { Billboard } from "@/types";


const getBillboard = async(id:string):Promise<Billboard> => {
	const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards/${id}`;
	const res = await fetch(URL,{
		cache: "no-store",
	});
	return res.json();
}

export default getBillboard;