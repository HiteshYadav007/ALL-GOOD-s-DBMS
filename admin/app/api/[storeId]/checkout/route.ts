import Stripe from "stripe";

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { getAllProductsByProductIDs, insertOrder } from "@/db/controllers/checkoutController";


const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET,PUT,DELETE,POST,OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type , Authorization",
}

export async function OPTIONS() {
	return NextResponse.json({},{headers:corsHeaders});
};

export async function POST(
	req:Request,
	{ params }:{params:{storeId:string}}
) {
	const { productIds,customerEmail } = await req.json();
	if (!productIds || productIds.length === 0 ){
		return new NextResponse("Product Ids are required",{ status:400});
	} 
	const productIdString = productIds.map((id:string) => `"${id}"`).join(',');
	const products = await getAllProductsByProductIDs(productIdString);
	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
	
	products.forEach((product) => {
			line_items.push({
				quantity:1,
				price_data: {
					currency:"inr",
					product_data:{
						name:product.name
					},
					unit_amount:product.price * 100,
				}
			});
		});

	const orderId = await insertOrder(params.storeId,products,customerEmail);

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode:'payment',
		billing_address_collection:"required",
		phone_number_collection:{
			enabled:true
		},
		success_url:`${process.env.FRONTEND_STORE_URL}/cart?success=1`,
		cancel_url:`${process.env.FRONTEND_STORE_URL}/cart?cancelled=1`,
		metadata:{
			orderId:orderId
		}
	});

	return NextResponse.json({url:session.url},{
		headers:corsHeaders
	});

}


// const order = await prismadb.order.create({
// 	data:{
// 		storeId:params.storeId,
// 		isPaid:false,
// 		orderItems:{
// 			create:productIds.map((productId:string) => ({
// 				product : {
// 					connect:{
// 						id:productId
// 					}
// 				}
// 			}))
// 		}
// 	}
// });


// products.forEach((product) => {
// 	line_items.push({
// 		quantity:1,
// 		price_data: {
// 			currency:"inr",
// 			product_data:{
// 				name:product.name
// 			},
// 			unit_amount:product.price * 100,
// 		}
// 	});
// });
