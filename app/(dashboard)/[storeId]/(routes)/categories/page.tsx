import { format } from "date-fns";
import { Metadata } from "next";

import prismadb from "@/lib/prismadb";

import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

export const metadata: Metadata = {
    title: "Categories",
    description: "Manage categories for your store.",
};

const CategoriesPage = async ({
    params,
}: {
    params: {
        storeId: string;
    };
}) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formatedCategories: CategoryColumn[] = categories.map((category) => {
        return {
            id: category.id,
            name: category.name,
            billboardLabel: category.billboard?.label,
            createdAt: format(category.createdAt, "do MMMM, yyyy"),
        };
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formatedCategories} />
            </div>
        </div>
    );
};

export default CategoriesPage;
