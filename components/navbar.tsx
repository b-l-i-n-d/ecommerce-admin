import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import { StoreSwitcher } from "@/components/store-switcher";
import { ModeToggle } from "@/components/theme-toggle";

import prismadb from "@/lib/prismadb";

export const Navbar = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });

    return (
        <div className="border-b top-0 fixed inset-x-0 backdrop-blur-xl z-10">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center gap-4">
                    <ModeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};
