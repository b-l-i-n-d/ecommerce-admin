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
    const products = await prismadb.product.findMany({
        where: {
            storeId,
            isArchived: false,
        },
        include: {
            sizes: true,
        },
    });

    const totalProductsInStock = products.reduce((total, product) => {
        const productStockCount = product.sizes.reduce((sum, size) => {
            return sum + size.stock;
        }, 0);

        return total + productStockCount;
    }, 0);

    return totalProductsInStock;
};
