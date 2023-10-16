import prismadb from "@/lib/prismadb";

interface GraphData {
    name: string;
    total: number;
}

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, orderItem) => {
            return (
                orderSum +
                orderItem.product.price.toNumber() * orderItem.quantity
            );
        }, 0);

        return total + orderTotal;
    }, 0);

    return totalRevenue;
};

export const getRevenueByMonth = async (storeId: string, month: number) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().getFullYear(), month, 1),
                lte: new Date(new Date().getFullYear(), month, 31),
            },
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, orderItem) => {
            return (
                orderSum +
                orderItem.product.price.toNumber() * orderItem.quantity
            );
        }, 0);

        return total + orderTotal;
    }, 0);

    return totalRevenue;
};

export const getCurrentMonthRevenue = async (storeId: string) => {
    return await getRevenueByMonth(storeId, new Date().getMonth());
};

export const getRevenueDiffByPercent = async (storeId: string) => {
    const revenue = await getCurrentMonthRevenue(storeId);

    const lastMonthRevenue = await getRevenueByMonth(
        storeId,
        new Date().getMonth() - 1
    );

    const percent = ((revenue - lastMonthRevenue) / lastMonthRevenue) * 100;

    return percent;
};

export const getGraphRevenueData = async (storeId: string) => {
    const graphData: GraphData[] = [
        {
            name: "Jan",
            total: 0,
        },
        {
            name: "Feb",
            total: 0,
        },
        {
            name: "Mar",
            total: 0,
        },
        {
            name: "Apr",
            total: 0,
        },
        {
            name: "May",
            total: 0,
        },
        {
            name: "Jun",
            total: 0,
        },
        {
            name: "Jul",
            total: 0,
        },
        {
            name: "Aug",
            total: 0,
        },
        {
            name: "Sep",
            total: 0,
        },
        {
            name: "Oct",
            total: 0,
        },
        {
            name: "Nov",
            total: 0,
        },
        {
            name: "Dec",
            total: 0,
        },
    ];

    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    paidOrders.forEach((order) => {
        const month = new Date(order.createdAt).getMonth();
        const orderTotal = order.orderItems.reduce((orderSum, orderItem) => {
            return (
                orderSum +
                orderItem.product.price.toNumber() * orderItem.quantity
            );
        }, 0);

        graphData[month].total += orderTotal;
    });

    return graphData;
};
