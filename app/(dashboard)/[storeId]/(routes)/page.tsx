import {
    CreditCard,
    DollarSign,
    MoveDownLeft,
    MoveHorizontal,
    MoveUpRight,
    Package,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import prismadb from "@/lib/prismadb";
import { formattNumber, formatter } from "@/lib/utils";

import {
    getCurrentMonthRevenue,
    getGraphRevenueData,
    getRevenueDiffByPercent,
    getTotalRevenue,
} from "@/actions/get-revenue-data";
import {
    getCurrentMonthSalesCount,
    getRecentSales,
    getSalesDiffByPercent,
    getTotalSalesCount,
} from "@/actions/get-sales-data";
import {
    getTotalPoductsInStock,
    getTypesOfProducts,
} from "@/actions/get-stock-data";
import { Overview } from "@/components/overview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = async ({
    params,
}: {
    params: {
        storeId: string;
    };
}) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    });

    const totalRevenue = await getTotalRevenue(params.storeId);
    const currentMonthRevenue = await getCurrentMonthRevenue(params.storeId);
    const revenueDiffByPercent = await getRevenueDiffByPercent(params.storeId);

    const totalSales = await getTotalSalesCount(params.storeId);
    const currentMonthSales = await getCurrentMonthSalesCount(params.storeId);
    const salesDiffByPercent = await getSalesDiffByPercent(params.storeId);
    const recentSales = await getRecentSales(params.storeId, 5);

    const totalProducts = await getTypesOfProducts(params.storeId);
    const totalStock = await getTotalPoductsInStock(params.storeId);
    const graphData = await getGraphRevenueData(params.storeId);

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading
                    title="Dashboard"
                    description={`Current month overview of your store: ${store?.name}`}
                />

                <Separator />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between">
                                <div className="text-2xl font-bold">
                                    {formatter.format(currentMonthRevenue)}
                                </div>

                                <div>
                                    {revenueDiffByPercent !== Infinity &&
                                    revenueDiffByPercent !== -Infinity &&
                                    !Number.isNaN(revenueDiffByPercent) &&
                                    revenueDiffByPercent !== undefined &&
                                    revenueDiffByPercent !== null ? (
                                        revenueDiffByPercent > 0 ? (
                                            <Badge>
                                                <MoveUpRight
                                                    size={15}
                                                    className="mr-2"
                                                />
                                                {revenueDiffByPercent}%
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                <MoveDownLeft
                                                    size={15}
                                                    className="mr-2"
                                                />
                                                {revenueDiffByPercent}%
                                            </Badge>
                                        )
                                    ) : (
                                        <Badge color="green">
                                            <MoveHorizontal
                                                size={15}
                                                className="mr-2"
                                            />
                                            No Data
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                You have total {formatter.format(totalRevenue)}{" "}
                                in revenue so far
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between">
                                <div className="text-2xl font-bold">
                                    +{formattNumber.format(currentMonthSales)}
                                </div>
                                <div>
                                    {salesDiffByPercent !== Infinity &&
                                    salesDiffByPercent !== -Infinity &&
                                    !Number.isNaN(salesDiffByPercent) &&
                                    salesDiffByPercent !== undefined &&
                                    salesDiffByPercent !== null ? (
                                        salesDiffByPercent > 0 ? (
                                            <Badge>
                                                <MoveUpRight
                                                    size={15}
                                                    className="mr-2"
                                                />
                                                {salesDiffByPercent}%
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                <MoveDownLeft
                                                    size={15}
                                                    className="mr-2"
                                                />
                                                {salesDiffByPercent}%
                                            </Badge>
                                        )
                                    ) : (
                                        <Badge color="green">
                                            <MoveHorizontal
                                                size={15}
                                                className="mr-2"
                                            />
                                            No Data
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                You have {totalSales} sales in total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Types of Products
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalProducts}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                You have {totalStock} products in stock
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview data={graphData} />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Recent Sales
                            </CardTitle>
                            <CardDescription>
                                You have made {currentMonthSales} sales this
                                month
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {recentSales?.map((sale) => (
                                <div
                                    key={sale.id}
                                    className="flex items-center"
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>
                                            {sale.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {sale.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {sale.phone}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        {formatter.format(
                                            sale.orderItems.reduce(
                                                (total, item) =>
                                                    total +
                                                    item.quantity *
                                                        item.product.price.toNumber(),
                                                0
                                            )
                                        )}
                                    </div>
                                </div>
                            )) ?? (
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-sm text-muted-foreground">
                                        No sales yet
                                    </p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex mt-auto items-stretch justify-center">
                            <Link href={`/${params.storeId}/orders`}>
                                <Button>View All</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
