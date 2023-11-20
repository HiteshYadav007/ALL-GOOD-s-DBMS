 
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { authorizedStore } from "@/db/controllers/apiController";
import { getAllBillboards, insertBillboard } from "@/db/controllers/billboardApiController";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
	req:Request,
	{ params } : { params: { storeId : string } }
) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session?.user.id;
		const {label , imageUrl} = await req.json();
	
		if(!userId){
			return new NextResponse("Unauthenticated" , { status: 401});
		}
		if (!label){
			return new NextResponse("Label is required" , { status: 400});
		}
		if (!imageUrl){
			return new NextResponse("Image URL is required" , { status: 400});
		}
		if (!params.storeId){
			return new NextResponse("Store Id is required" , { status: 400});
		}

		const storeByUserId = await authorizedStore(params.storeId,userId);

		if(!storeByUserId){
			return new NextResponse("UnAuthorized",{status:403});
		}
		const billboard = await insertBillboard(label,imageUrl,params.storeId);
		
		return NextResponse.json(billboard);

	} catch (error) {
		console.log('[BILLBOARDS_POST]',error);
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
		const billboards = await getAllBillboards(params.storeId);
		return NextResponse.json(billboards);

	} catch (error) {
		console.log('[BILLBOARDS_GET]',error);
		return new NextResponse("Internal error",{status:500});
	}
}