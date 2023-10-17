import prismadb from "@/lib/prismadb";

import { BillboardForm } from "./components/billboard-form";

export async function generateMetadata({
    params,
}: {
    params: { billboardId: string };
}) {
    if (params.billboardId === "new") {
        return {
            title: "Add Billboard",
            description: "Create a new billboard for your store.",
        };
    } else {
        return {
            title: "Edit Billboard",
            description: `Edit billboard for your store.`,
        };
    }
}

const BillboardPage = async ({
    params,
}: {
    params: { billboardId: string };
}) => {
    const billboard = await prismadb.billboard.findUnique({
        where: { id: params.billboardId },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    );
};

export default BillboardPage;
