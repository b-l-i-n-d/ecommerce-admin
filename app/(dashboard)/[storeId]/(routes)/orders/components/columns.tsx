"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
    id: string;
    phone: string;
    address: string;
    isPaid: boolean;
    products: string;
    totalPrice: string;
    createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
        cell: ({ row }) => (
            <Badge variant={row.original.isPaid ? "default" : "destructive"}>
                {row.original.isPaid ? "Yes" : "No"}
            </Badge>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
];
