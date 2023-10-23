"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export const SignInWithTheme = () => {
    const { resolvedTheme } = useTheme();

    return (
        <SignIn
            appearance={{
                baseTheme: resolvedTheme === "dark" ? dark : undefined,
            }}
        />
    );
};
