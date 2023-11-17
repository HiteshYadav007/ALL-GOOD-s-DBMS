import { authorizedStore } from "@/db/controllers/apiController";
import { deleteSize, getSize, updateSize } from "@/db/controllers/sizeApiController";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { sizeId: string } }
) {
	try {
		
		if(!params.sizeId){
			return new NextResponse("SizeId is required",{status:400});
		}

		const size = await getSize(params.sizeId);

	return NextResponse.json(size);

	} catch (error) {
		console.log("[SIZE_GET]:", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
};

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string  , sizeId: string } }
) {
  try {
    const { userId } = auth();
    const { name , value } = await req.json();
    
	if (!userId) {
      	return new NextResponse("Unauthenticated", { status: 401 });
    }
	if(!name){
		return new NextResponse("Name is required",{ status:400 });
	}
	if(!value){
		return new NextResponse("value is required",{ status:400 });
	}
	if(!params.sizeId){
		return new NextResponse("sizeId is required",{status:400});
	}

	const storeByUserId = await authorizedStore(params.storeId,userId);


	if(!storeByUserId){
		return new NextResponse("UnAuthorized",{status:403});
	}
	const size = await updateSize(name,value,params.sizeId);

	return NextResponse.json(size);

  } catch (error) {
    console.log("[SIZE_PATCH]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId:string ,sizeId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}
		
		if(!params.sizeId){
			return new NextResponse("sizeId is required",{status:400});
		}

		const storeByUserId = await authorizedStore(params.storeId,userId);
	
		if(!storeByUserId){
			return new NextResponse("UnAuthorized",{status:403});
		}

		const size = await deleteSize(params.sizeId);

	return NextResponse.json(size);

	} catch (error) {
		console.log("[SIZE_DELETE]:", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
};
