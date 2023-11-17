import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderColumn } from "./components/columns"
import { OrderClient } from "./components/client";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { getAllOrders } from "@/db/controllers/checkoutController";


const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await getAllOrders(params.storeId);

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.orderId,
    phoneno: item.phoneno,
    address: item.address,
    products: item.name,
    totalPrice: Number(item.price),
    isPaid: (item.isPaid === 1),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <Suspense fallback={<Loading/>}>
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
    </Suspense>
  );
};

export default OrdersPage;