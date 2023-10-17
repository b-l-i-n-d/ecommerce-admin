import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";

export async function generateMetadata({
    params,
}: {
    params: { productId: string };
}) {
    if (params.productId !== "new") {
        return {
            title: "Edit Product",
            description: "Edit a product for your store.",
        };
    } else {
        return {
            title: "Add Product",
            description: "Add a product for your store.",
        };
    }
}

const BillboardPage = async ({
    params,
}: {
    params: { productId: string; storeId: string };
}) => {
    const product = await prismadb.product.findUnique({
        where: { id: params.productId },
        include: {
            images: true,
        },
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    initialData={JSON.parse(JSON.stringify(product))}
                    categories={categories}
                    sizes={sizes}
                    colors={colors}
                />
            </div>
        </div>
    );
};

export default BillboardPage;
