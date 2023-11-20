 
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { authorizedStore } from "@/db/controllers/apiController";
import { getProducts, insertProduct } from "@/db/controllers/productApiController";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
	req:Request,
	{ params } : { params: { storeId : string } }
) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session?.user.id;
		const {
			name,
			imageUrl,
			price,
			subCategoryId,
			quantity,
			sizeId,
			isFeatured,
		} = await req.json();
	
		if(!userId){
			return new NextResponse("Unauthenticated" , { status: 401});
		}
		if (!name){
			return new NextResponse("name is required" , { status: 400});
		}
		if (!price){
			return new NextResponse("Price is required" , { status: 400});
		}
		if(!imageUrl){
			return new NextResponse("Images are required" , { status: 400});
		}
		if (!sizeId){
			return new NextResponse("Size Id is required" , { status: 400});
		}
		if (!subCategoryId){
			return new NextResponse("Category Id is required" , { status: 400});
		}
		if (!params.storeId){
			return new NextResponse("Store Id is required" , { status: 400});
		}

		const storeByUserId = await authorizedStore(params.storeId,userId);

		if(!storeByUserId){
			return new NextResponse("UnAuthorized",{status:403});
		}

		const product = await insertProduct(name,price,params.storeId,subCategoryId,sizeId,quantity,isFeatured,imageUrl);
	
		return NextResponse.json(product);

	} catch (error) {
		console.log('[PRODUCTS_POST]',error);
		return new NextResponse("Internal error",{status:500});
	}
};

export async function GET(
	req:Request,
	{ params } : { params: { storeId : string } }
) {
	try {
		const { searchParams }  = new URL(req.url);
		const categoryId = searchParams.get("categoryId") || undefined ;
		const sizeId = searchParams.get("sizeId") || undefined ;
		const isFeatured = searchParams.get("isFeatured") || undefined;

		if (!params.storeId){
			return new NextResponse("Store Id is required" , { status: 400});
		}
		const products = await getProducts(categoryId,sizeId,isFeatured,params.storeId);
		return NextResponse.json(products);

	} catch (error) {
		console.log('[PRODUCTS_GET]',error);
		return new NextResponse("Internal error",{status:500});
	}
}