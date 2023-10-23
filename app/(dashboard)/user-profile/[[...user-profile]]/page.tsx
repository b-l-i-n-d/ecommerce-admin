"use client";

import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const UserProfilePage = () => {
    const { resolvedTheme } = useTheme();

    return (
        <div className="flex justify-center mx-auto">
            <UserProfile
                appearance={{
                    baseTheme: resolvedTheme === "dark" ? dark : undefined,
                }}
                path="/user-profile"
                routing="path"
            />
        </div>
    );
};

export default UserProfilePage;
