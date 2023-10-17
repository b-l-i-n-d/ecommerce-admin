import { format } from "date-fns";
import { Metadata } from "next";

import prismadb from "@/lib/prismadb";

import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";

export const metadata: Metadata = {
    title: "Sizes",
    description: "View sizes for your store.",
};

const SizesPage = async ({
    params,
}: {
    params: {
        storeId: string;
    };
}) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formatedSizes: SizeColumn[] = sizes.map((size) => {
        return {
            id: size.id,
            name: size.name,
            value: size.value,
            createdAt: format(size.createdAt, "do MMMM, yyyy"),
        };
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formatedSizes} />
            </div>
        </div>
    );
};

export default SizesPage;
