"use client";

import { Copy, Server } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = "public",
}) => {
    const { toast } = useToast();

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast({
            title: "Copied",
            description: "Copied to clipboard.",
        });
    };

    return (
        <Alert>
            <Server className="w-4 h-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted text-sm px-[0.3] py-[0.2] font-mono font-semibold">
                    {description}
                </code>
                <Button size="icon" variant={"outline"} onClick={onCopy}>
                    <Copy className="h-4 w-4" />
                </Button>
            </AlertDescription>
        </Alert>
    );
};
