import prismadb from "@/lib/prismadb";

export const getTypesOfProducts = async (storeId: string) => {
    const totalProductsCount = await prismadb.product.count({
        where: {
            storeId,
            isArchived: false,
        },
    });
    return totalProductsCount;
};

export const getTotalPoductsInStock = async (storeId: string) => {
    const totalProductsInStock = await prismadb.product.aggregate({
        where: {
            storeId,
            isArchived: false,
        },
        _sum: {
            stock: true,
        },
    });

    return totalProductsInStock._sum.stock;
};
