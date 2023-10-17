"use client";

import { Plus } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ApiList } from "@/components/ui/api-list";
import Link from "next/link";
import { ColorColumn, columns } from "./columns";

interface ColorClientProps {
    data: ColorColumn[];
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Colors (${data.length})`}
                    description="Manage colors for your store."
                />
                <Link href={`/${params.storeId}/colors/new`}>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                    </Button>
                </Link>
            </div>

            <Separator />

            <DataTable columns={columns} data={data} searchKey="name" />

            <Heading title="API" description="API calls for colors." />

            <Separator />

            <ApiList entityIdName="colorId" entityName="colors" />
        </>
    );
};
