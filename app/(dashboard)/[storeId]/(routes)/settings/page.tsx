import { auth } from "@clerk/nextjs";
import { NextPage } from "next";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { SettingForm } from "./components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    };
}

const SettingsPage: NextPage<SettingsPageProps> = async ({ params }) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        },
    });

    if (!store) {
        redirect("/");
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingForm initialData={store} />
            </div>
        </div>
    );
};

export default SettingsPage;
