"use client";

import { useTheme } from "next-themes";
import { HashLoader } from "react-spinners";

export const Loader = () => {
    const { resolvedTheme } = useTheme();

    return (
        <HashLoader
            color={resolvedTheme === "dark" ? "#fff" : "#000"}
            size={50}
        />
    );
};
