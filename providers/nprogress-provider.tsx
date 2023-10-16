"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";

const NProgressProviders = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    return (
        <>
            {children}
            <ProgressBar
                height="2px"
                color="#3b82f6"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
};

export default NProgressProviders;
