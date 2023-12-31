"use client";

import { Plus } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ApiList } from "@/components/ui/api-list";
import Link from "next/link";
import { SizeColumn, columns } from "./columns";

interface SizeClientProps {
    data: SizeColumn[];
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Manage sizes for your store."
                />
                <Link href={`/${params.storeId}/sizes/new`}>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                    </Button>
                </Link>
            </div>

            <Separator />

            <DataTable columns={columns} data={data} searchKey="name" />

            <Heading title="API" description="API calls for sizes." />

            <Separator />

            <ApiList entityIdName="sizeId" entityName="sizes" />
        </>
    );
};
