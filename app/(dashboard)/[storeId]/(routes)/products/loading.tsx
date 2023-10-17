"use client";

import { Loader } from "@/components/ui/loader";

const Loading = () => {
    return (
        <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
            <Loader />
        </div>
    );
};

export default Loading;
