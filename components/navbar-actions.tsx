"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ModeToggle } from "./theme-toggle";

export const NavbarActions = () => {
    const { resolvedTheme } = useTheme();

    return (
        <div className="ml-auto flex items-center gap-4">
            <ModeToggle />
            <UserButton
                appearance={{
                    baseTheme: resolvedTheme === "dark" ? dark : undefined,
                }}
                userProfileMode="navigation"
                userProfileUrl="/user-profile"
                afterSignOutUrl="/"
            />
        </div>
    );
};
