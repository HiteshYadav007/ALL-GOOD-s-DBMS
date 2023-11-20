import OrderItem from "@/components/orderItem";
import Container from "@/components/ui/container";
import { getOrders } from "@/lib/db/ordersController";
import { OrderItem as OrderItemType } from "@/types";
import { getServerSession } from "next-auth";

const Orders = async() => {
	const session = await getServerSession();
	const email = session?.user.email;
	if(!email){
		return null;
	}
	const result = await getOrders(email);
	const orderItems:OrderItemType[] = result[0] as any as OrderItemType[];



	return ( 
		<div className="bg-white">
			<Container>
				<div className="px-4 py-16 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-black">Orders</h1>
					<div className="mt-12 lg:grid lg:grid-cols-12">
						<div className="lg:col-span-7">
							{orderItems.length === 0 && <p className="text-neutral-500">No items added to cart </p>}
							<ul>
								{orderItems.map((item) => (
									<OrderItem
										key={item.productId}
										data={item}
									/>
								))}
							</ul>
						</div>
					</div>
				</div>
			</Container>
		</div>
	 );
	//  );
}
 
export default Orders;