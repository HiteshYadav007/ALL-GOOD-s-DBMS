import { deleteStore, updateCategory } from "@/db/controllers/apiController";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
 
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
	const userId = session?.user.id;
    const { name } = await req.json();
    
	if (!userId) {
      	return new NextResponse("Unauthenticated", { status: 401 });
    }
	if(!name){
		return new NextResponse("Name is required",{ status:400 });
	}
	if(!params.storeId){
		return new NextResponse("StoreId is required",{status:400});
	}

	const storeId = await updateCategory(name,params.storeId)
	
	return NextResponse.json(storeId);

  } catch (error) {
    console.log("[STORE_PATCH]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session?.user.id;

		if (!userId) {
			return new NextResponse("Unauthenticated", { status: 401 });
		}
		if(!params.storeId){
			return new NextResponse("StoreId is required",{status:400});
		}

		const store = await deleteStore(params.storeId);

	return NextResponse.json(store);

	} catch (error) {
		console.log("[STORE_DELETE]:", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
};
