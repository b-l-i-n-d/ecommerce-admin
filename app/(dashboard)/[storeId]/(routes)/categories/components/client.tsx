"use client";

import { AlertCircle, Plus } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ApiList } from "@/components/ui/api-list";
import Link from "next/link";
import { CategoryColumn, columns } from "./columns";

interface CategoryClientProps {
    data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage categories for your store."
                />
                <Link href={`/${params.storeId}/categories/new`}>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                    </Button>
                </Link>
            </div>

            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add items orderly.</AlertTitle>
                <AlertDescription>
                    The items you add will be displayed in the order and store
                    you add them.
                </AlertDescription>
            </Alert>

            <Separator />

            <DataTable columns={columns} data={data} searchKey="name" />

            <Heading title="API" description="API calls for categories." />

            <Separator />

            <ApiList entityIdName="categorieId" entityName="categories" />
        </>
    );
};
