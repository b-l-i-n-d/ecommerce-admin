import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { BillboardClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
    description: "View products for your store.",
};

const ProductsPage = async ({
    params,
}: {
    params: {
        storeId: string;
    };
}) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true,
            sizes: true,
            color: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formatedProducts: ProductColumn[] = products.map((product) => {
        return {
            id: product.id,
            name: product.name,
            isFeatured: product.isFeatured,
            isArchived: product.isArchived,
            price: formatter.format(product.price.toNumber()),
            category: product.category.name,
            sizes: product.sizes.length,
            color: {
                name: product.color.name,
                value: product.color.value,
            },
            createdAt: format(product.createdAt, "do MMMM, yyyy"),
        };
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formatedProducts} />
            </div>
        </div>
    );
};

export default ProductsPage;
