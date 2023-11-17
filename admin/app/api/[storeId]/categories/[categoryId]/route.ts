import { authorizedStore } from "@/db/controllers/apiController";
import { deleteCategory, getCategory, updateCategory } from "@/db/controllers/categoryApiController";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { categoryId: string } }
) {
	try {
		
		if(!params.categoryId){
			return new NextResponse("categoryId is required",{status:400});
		}

		const category = await getCategory(params.categoryId);

	return NextResponse.json(category);

	} catch (error) {
		console.log("[category_GET]:", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
};

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string  , categoryId: string } }
) {
  try {
    const { userId } = auth();
    const { name , billboardId } = await req.json();
    
	if (!userId) {
      	return new NextResponse("Unauthenticated", { status: 401 });
    }
	if(!name){
		return new NextResponse("Label is required",{ status:400 });
	}
	if(!billboardId){
		return new NextResponse("billboardId is required",{ status:400 });
	}
	if(!params.categoryId){
		return new NextResponse("categoryId is required",{status:400});
	}

	const storeByUserId = await authorizedStore(params.storeId,userId);

	if(!storeByUserId){
		return new NextResponse("UnAuthorized",{status:403});
	}
	const category = await updateCategory(params.categoryId,name,billboardId);

	return NextResponse.json(category);

  } catch (error) {
    console.log("[CATEGORY_PATCH]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId:string ,categoryId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}
		
		if(!params.categoryId){
			return new NextResponse("categoryId is required",{status:400});
		}

		const storeByUserId = await authorizedStore(params.storeId,userId);
	
		if(!storeByUserId){
			return new NextResponse("UnAuthorized",{status:403});
		}

		const category = await deleteCategory(params.categoryId);
		console.log(category);

	return NextResponse.json(category);

	} catch (error) {
		console.log("[CATEGORY_DELETE]:", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
};
