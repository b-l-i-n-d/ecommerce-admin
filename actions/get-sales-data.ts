import prismadb from "@/lib/prismadb";

export const getTotalSalesCount = async (storeId: string) => {
    const totalSalesCount = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true,
        },
    });

    return totalSalesCount;
};

export const getSalesCountByMonth = async (storeId: string, month: number) => {
    const salesCount = await prismadb.order.count({
        where: {
            storeId,
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().getFullYear(), month, 1),
                lte: new Date(new Date().getFullYear(), month, 31),
            },
        },
    });

    return salesCount;
};

export const getCurrentMonthSalesCount = async (storeId: string) => {
    return await getSalesCountByMonth(storeId, new Date().getMonth());
};

export const getSalesDiffByPercent = async (storeId: string) => {
    const salesCount = await getCurrentMonthSalesCount(storeId);

    const lastMonthSalesCount = await getSalesCountByMonth(
        storeId,
        new Date().getMonth() - 1
    );

    const percent =
        ((salesCount - lastMonthSalesCount) / lastMonthSalesCount) * 100;

    return percent;
};

export const getRecentSales = async (storeId: string, amount: number) => {
    const recentSales = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        take: amount,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    return recentSales;
};
