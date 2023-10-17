import prismadb from "@/lib/prismadb";

import { SizeForm } from "./components/size-form";

export async function generateMetadata({
    params,
}: {
    params: { sizeId: string };
}) {
    if (params.sizeId !== "new") {
        return {
            title: "Edit Size",
            description: "Edit a size for your store.",
        };
    } else {
        return {
            title: "Add Size",
            description: "Add a size for your store.",
        };
    }
}

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
    const size = await prismadb.size.findUnique({
        where: { id: params.sizeId },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size} />
            </div>
        </div>
    );
};

export default SizePage;
