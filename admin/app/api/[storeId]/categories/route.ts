 
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getAllCategories, insertCategory } from "@/db/controllers/categoryApiController";
import { authorizedStore } from "@/db/controllers/apiController";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
	req:Request,
	{ params } : { params: { storeId : string } }
) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session?.user.id;
		const  { name , billboardId } = await req.json();
	
		if(!userId){
			return new NextResponse("Unauthenticated" , { status: 401});
		}
		if (!name){
			return new NextResponse("Name is required" , { status: 400});
		}
		if (!params.storeId){
			return new NextResponse("Store Id is required" , { status: 400});
		}
		// const storeByUserId = await authorizedStore(params.storeId,userId);

		// if(!storeByUserId){
		// 	return new NextResponse("UnAuthorized",{status:403});
		// }

		const category = await insertCategory(name,params.storeId,billboardId);
		return NextResponse.json(category);

	} catch (error) {
		console.log('[CATEGORIES_POST]',error);
		return new NextResponse("Internal error",{status:500});
	}
};

export async function GET(
	req:Request,
	{ params } : { params: { storeId : string } }
) {
	try {
		
		if (!params.storeId){
			return new NextResponse("Store Id is required" , { status: 400});
		}
		const categories = await getAllCategories(params.storeId);
		return NextResponse.json(categories);

	} catch (error) {
		console.log('[CATEGORIES_GET]',error);
		return new NextResponse("Internal error",{status:500});
	}
}