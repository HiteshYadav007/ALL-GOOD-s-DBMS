import { authorizedStore } from "@/db/controllers/apiController";
import { deleteBillboard, getBillboard, updateBillboard } from "@/db/controllers/billboardApiController";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
 
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { billboardId: string } }
) {
	try {
		
		if(!params.billboardId){
			return new NextResponse("BillboardId is required",{status:400});
		}

		const billboard = await getBillboard(params.billboardId);

	return NextResponse.json(billboard);

	} catch (error) {
		console.log("[BILLBOARD_GET]:", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
};

export async function PATCH(
  req: Request,
  { params }: { params: { storeId:string  , billboardId: string } }
) {
  try {
	const session = await getServerSession(authOptions);
	const userId = session?.user.id;
    const { label , imageUrl } = await req.json();
    
	if (!userId) {
      	return new NextResponse("Unauthenticated", { status: 401 });
    }
	if(!label){
		return new NextResponse("Label is required",{ status:400 });
	}
	if(!imageUrl){
		return new NextResponse("image Url is required",{ status:400 });
	}
	if(!params.billboardId){
		return new NextResponse("BillboardId is required",{status:400});
	}

	const storeByUserId = await authorizedStore(params.storeId,userId);

	if(!storeByUserId){
		return new NextResponse("UnAuthorized",{status:403});
	}
	const billboard = await updateBillboard(label,imageUrl,params.billboardId);

	return NextResponse.json(billboard);

  } catch (error) {
    console.log("[BILLBOARD_PATCH]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId:string ,billboardId: string } }
) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session?.user.id;
		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}
		
		if(!params.billboardId){
			return new NextResponse("BillboardId is required",{status:400});
		}

		const storeByUserId = await authorizedStore(params.storeId,userId);
	
		if(!storeByUserId){
			return new NextResponse("UnAuthorized",{status:403});
		}

		const billboard = await deleteBillboard(params.billboardId);

	return NextResponse.json(billboard);

	} catch (error) {
		console.log("[BILLBOARD_DELETE]:", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
};
