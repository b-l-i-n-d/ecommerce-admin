import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const isFeatured = searchParams.get("isFeatured");

        if (!params.storeId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        const store = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
            },
        });

        if (!store) {
            return new NextResponse("Store not found", { status: 404 });
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                sizes: {
                    some: {
                        sizeId: sizeId,
                    },
                },
                colorId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
            },
            include: {
                images: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                category: true,
                sizes: {
                    include: {
                        size: true,
                    },
                },
                color: true,
            },
        });

        return NextResponse.json(products, { status: 201 });
    } catch (error) {
        console.error("[PRODUCTS_GET", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();

        const body = await req.json();

        const {
            name,
            images,
            price,
            categoryId,
            sizes,
            colorId,
            isFeatured,
            isArchived,
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!name) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse("Image is required", { status: 400 });
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        }

        if (price < 0) {
            return new NextResponse("Price must be greater than 0", {
                status: 400,
            });
        }

        if (!categoryId) {
            return new NextResponse("Category is required", { status: 400 });
        }

        if (!sizes || !sizes.length) {
            return new NextResponse("Size/s is/are required", { status: 400 });
        }

        if (
            !sizes.every(
                (size: { sizeId: string; stock: number }) =>
                    size.sizeId && size.stock
            )
        ) {
            return new NextResponse("Size/s is/are required", { status: 400 });
        }

        if (
            !sizes.every(
                (size: { sizeId: string; stock: number }) => size.stock > 0
            )
        ) {
            return new NextResponse("Stock must be greater than 0", {
                status: 400,
            });
        }

        if (!colorId) {
            return new NextResponse("Color is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

        const product = await prismadb.product.create({
            data: {
                name,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
                price,
                categoryId,
                sizes: {
                    createMany: {
                        data: [
                            ...sizes.map(
                                (size: { sizeId: string; stock: number }) =>
                                    size
                            ),
                        ],
                    },
                },
                colorId,
                isFeatured,
                isArchived,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.log("[PRODUCTS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
