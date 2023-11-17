import { Size } from "@/types";



export const getSize = async(
	sizeId:string
):Promise<Size> => {
	
	const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes/${sizeId}`;
	const res = await fetch(URL,{
		cache: "no-store",
	});
	return res.json();
}