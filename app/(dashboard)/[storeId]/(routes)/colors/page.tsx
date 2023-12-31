import { format } from "date-fns";
import { Metadata } from "next";

import prismadb from "@/lib/prismadb";

import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";

export const metadata: Metadata = {
    title: "Colors",
    description: "View colors for your store.",
};

const ColorsPage = async ({
    params,
}: {
    params: {
        storeId: string;
    };
}) => {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formatedColors: ColorColumn[] = colors.map((color) => {
        return {
            id: color.id,
            name: color.name,
            value: color.value,
            createdAt: format(color.createdAt, "do MMMM, yyyy"),
        };
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient data={formatedColors} />
            </div>
        </div>
    );
};

export default ColorsPage;
