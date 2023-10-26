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
import { BillboardColumn, columns } from "./columns";

interface BillboardClientProps {
    data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage billboards for your store."
                />
                <Link href={`/${params.storeId}/billboards/new`}>
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

            <DataTable columns={columns} data={data} searchKey="label" />

            <Heading title="API" description="API calls for billboards." />

            <Separator />

            <ApiList entityIdName="billboardId" entityName="billboards" />
        </>
    );
};
