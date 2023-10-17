import { format } from "date-fns";
import { Metadata } from "next";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";

export const metadata: Metadata = {
    title: "Orders",
    description: "View orders for your store.",
};

const OrdersPage = async ({
    params,
}: {
    params: {
        storeId: string;
    };
}) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formatedOrders: OrderColumn[] = orders.map((order) => {
        return {
            id: order.id,
            name: order.name,
            phone: order.phone,
            address: order.address,
            products: order.orderItems
                .map((orderItem) => orderItem.product.name)
                .join(", "),
            totalPrice: formatter.format(
                order.orderItems.reduce(
                    (total, currItem) =>
                        total +
                        Number(currItem.product.price) * currItem.quantity,
                    0
                )
            ),
            isPaid: order.isPaid,
            createdAt: format(order.createdAt, "do MMMM, yyyy"),
        };
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formatedOrders} />
            </div>
        </div>
    );
};

export default OrdersPage;
