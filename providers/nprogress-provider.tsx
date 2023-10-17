"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NProgressProviders = ({ children }: { children: React.ReactNode }) => {
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
