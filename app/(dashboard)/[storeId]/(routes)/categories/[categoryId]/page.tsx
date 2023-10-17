import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";

export async function generateMetadata({
    params,
}: {
    params: { categoryId: string; storeId: string };
}) {
    if (params.categoryId === "new") {
        return {
            title: "Add Category",
            description: "Create a new category for your store.",
        };
    } else {
        return {
            title: "Edit Category",
            description: `Edit category for your store.`,
        };
    }
}

const CategoryPage = async ({
    params,
}: {
    params: { categoryId: string; storeId: string };
}) => {
    const category = await prismadb.category.findUnique({
        where: { id: params.categoryId },
    });

    const billboards = await prismadb.billboard.findMany({
        where: { storeId: params.storeId },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm initialData={category} billboards={billboards} />
            </div>
        </div>
    );
};

export default CategoryPage;
