"use client";

import { useTheme } from "next-themes";
import { HashLoader } from "react-spinners";

export const Loader = () => {
    const { theme } = useTheme();

    return (
        <HashLoader
            color={
                theme === "system" ? "gray" : theme === "dark" ? "#fff" : "#000"
            }
            size={50}
        />
    );
};
