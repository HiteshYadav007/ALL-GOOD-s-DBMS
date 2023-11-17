import Stripe from "stripe";

import {headers} from 'next/headers';
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { updateOrder } from "@/db/controllers/checkoutController";


export async function POST(req:Request) {
	const body = await req.text();
	const signature = headers().get("Stripe-Signature") as string;

	let event:Stripe.Event;

	try{
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		)
	} catch(error:any) {
		return new NextResponse(`Webhook error : ${error.message}`,{ status:400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const address = session?.customer_details?.address;

	const addressComponents = [
		address?.line1,
		address?.line2,
		address?.city,
		address?.state,
		address?.postal_code,
		address?.country
	]

	const addressString = addressComponents.filter((c) => c !== null).join(', ');

	if(event.type === "checkout.session.completed"){
		console.log("Completed")
		console.log(addressString,session?.customer_details?.phone || "",session?.metadata?.orderId || "");
		const order = await updateOrder(addressString,session?.customer_details?.phone || "",session?.metadata?.orderId || "");
		
		//const productIds = order.orderItems.map((orderItem) => orderItem.productId);
		// take care of quantity 
	}

	return new NextResponse(null,{status:200});
}


// await prismadb.order.update({
// 	where:{
// 		id:session?.metadata?.orderId,
// 	},
// 	data:{
// 		isPaid:true,
// 		address:addressString,
// 		phoneno:session?.customer_details?.phone || "",
// 	},
// 	include:{
// 		orderItems:true,
// 	}
// });
// await prismadb.product.updateMany({
// 	where:{
// 		id:{
// 			in:[...productIds]
// 		}
// 	},
// 	data:{
// 		isArchived:true
// 	}
// });