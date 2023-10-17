"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] w-full space-y-2">
            <Heading title="Something went wrong" />
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    );
}
