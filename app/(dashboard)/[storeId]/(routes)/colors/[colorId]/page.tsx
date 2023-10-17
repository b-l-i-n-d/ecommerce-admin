import prismadb from "@/lib/prismadb";

import { ColorForm } from "./components/color-form";

export async function generateMetadata({
    params,
}: {
    params: { colorId: string };
}) {
    if (params.colorId) {
        return {
            title: "Edit Color",
            description: "Edit a color for your store.",
        };
    } else {
        return {
            title: "Add Color",
            description: "Add a color for your store.",
        };
    }
}

const SizePage = async ({ params }: { params: { colorId: string } }) => {
    const color = await prismadb.color.findUnique({
        where: { id: params.colorId },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm initialData={color} />
            </div>
        </div>
    );
};

export default SizePage;
