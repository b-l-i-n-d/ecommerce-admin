"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductColumn = {
    id: string;
    name: string;
    isFeatured: boolean;
    isArchived: boolean;
    price: string;
    category: string;
    size: string;
    color: string;
    createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
        cell: ({ row }) => (
            <Badge variant={row.original.isFeatured ? "default" : "secondary"}>
                {row.original.isFeatured ? "Yes" : "No"}
            </Badge>
        ),
    },
    {
        accessorKey: "isArchived",
        header: "Archived",
        cell: ({ row }) => (
            <Badge
                variant={row.original.isArchived ? "destructive" : "default"}
            >
                {row.original.isArchived ? "Yes" : "No"}
            </Badge>
        ),
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.color}
                <div
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: row.original.color }}
                />
            </div>
        ),
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
