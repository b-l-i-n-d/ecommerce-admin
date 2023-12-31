"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ApiList } from "@/components/ui/api-list";
import Link from "next/link";
import { ProductColumn, columns } from "./columns";

interface ProductClientProps {
    data: ProductColumn[];
}

export const BillboardClient: React.FC<ProductClientProps> = ({ data }) => {
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage products for your store."
                />
                <Link href={`/${params.storeId}/products/new`}>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                    </Button>
                </Link>
            </div>

            <Separator />

            <DataTable columns={columns} data={data} searchKey="name" />

            <Heading title="API" description="API calls for products." />

            <Separator />

            <ApiList entityIdName="productsId" entityName="products" />
        </>
    );
};
