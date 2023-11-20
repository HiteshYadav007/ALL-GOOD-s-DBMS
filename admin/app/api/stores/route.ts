 
import { NextResponse } from "next/server";
import { insertCategory } from "@/db/controllers/apiController";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function POST(
	req:Request,
) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session?.user.id;
		const body = await req.json();
		const { name } = body;
 
		if(!userId){
			return new NextResponse("Unauthorized" , { status: 401});
		}
		if (!name){
			return new NextResponse("Name is required" , { status: 400});
		}
		const storeId = await insertCategory({
			data:{
				name,
				userId,
			}
		});
		return NextResponse.json(storeId);

	} catch (error) {
		console.log('[STORES_POST]',error);
		return new NextResponse("Internal error",{status:500});
	}
}