 
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { authorizedStore } from "@/db/controllers/apiController";
import { getAllSizes, insertSize } from "@/db/controllers/sizeApiController";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
	req:Request,
	{ params } : { params: { storeId : string } }
) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session?.user.id;
		const {name , value} = await req.json();
	
		if(!userId){
			return new NextResponse("Unauthenticated" , { status: 401});
		}
		if (!name){
			return new NextResponse("Name is required" , { status: 400});
		}
		if (!value){
			return new NextResponse("Value is required" , { status: 400});
		}
		if (!params.storeId){
			return new NextResponse("Store Id is required" , { status: 400});
		}

		const storeByUserId = await authorizedStore(params.storeId,userId);

		if(!storeByUserId){
			return new NextResponse("UnAuthorized",{status:403});
		}

		const size = await insertSize(name,value,params.storeId);
		
		return NextResponse.json(size);

	} catch (error) {
		console.log('[SIZES_POST]',error);
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
		const sizes = await getAllSizes(params.storeId);
		return NextResponse.json(sizes);

	} catch (error) {
		console.log('[SIZES_GET]',error);
		return new NextResponse("Internal error",{status:500});
	}
}