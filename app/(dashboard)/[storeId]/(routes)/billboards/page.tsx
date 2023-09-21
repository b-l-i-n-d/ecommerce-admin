import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BillboardClient } from "./components/client";

const BillboardsPage = async ({
    params,
}: {
    params: {
        storeId: string;
    };
}) => {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formatedBillboards = billboards.map((billboard) => {
        return {
            id: billboard.id,
            label: billboard.label,
            createdAt: format(billboard.createdAt, "do MMMM, yyyy"),
        };
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formatedBillboards} />
            </div>
        </div>
    );
};

export default BillboardsPage;
