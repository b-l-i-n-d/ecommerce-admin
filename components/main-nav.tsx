"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const MainNav = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: "Overview",
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboards",
            active:
                pathname === `/${params.storeId}/billboards` ||
                pathname.match(/\/billboards\/.*/),
        },
        {
            href: `/${params.storeId}/categories`,
            label: "Categories",
            active:
                pathname === `/${params.storeId}/categories` ||
                pathname.match(/\/categories\/.*/),
        },
        {
            href: `/${params.storeId}/sizes`,
            label: "Sizes",
            active:
                pathname === `/${params.storeId}/sizes` ||
                pathname.match(/\/sizes\/.*/),
        },
        {
            href: `/${params.storeId}/colors`,
            label: "Colors",
            active:
                pathname === `/${params.storeId}/colors` ||
                pathname.match(/\/colors\/.*/),
        },
        {
            href: `/${params.storeId}/products`,
            label: "Products",
            active:
                pathname === `/${params.storeId}/products` ||
                pathname.match(/\/products\/.*/),
        },
        {
            href: `/${params.storeId}/orders`,
            label: "Orders",
            active:
                pathname === `/${params.storeId}/orders` ||
                pathname.match(/\/orders\/.*/),
        },
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`,
        },
    ];

    return (
        <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active
                            ? "text-black dark:text-white font-bold"
                            : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};
