import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        if (!params.productId) {
            return new NextResponse("Product ID is required", {
                status: 400,
            });
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                sizes: true,
                color: true,
            },
        });

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("[PRODUCT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string; productId: string } }
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
            return new NextResponse("Unauthorized", { status: 403 });
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
            return new NextResponse("Size is required", { status: 400 });
        }

        if (
            !sizes.every(
                (size: { sizeId: string; stock: number }) =>
                    size.sizeId && size.stock
            )
        ) {
            return new NextResponse("Size is required", { status: 400 });
        }

        if (!sizes.every((size: { stock: number }) => size.stock >= 0)) {
            return new NextResponse("Stock can not be less than 0", {
                status: 400,
            });
        }

        if (!colorId) {
            return new NextResponse("Color is required", { status: 400 });
        }

        if (!params.productId) {
            return new NextResponse("Product ID is required", {
                status: 400,
            });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                images: {
                    deleteMany: {},
                },
                price,
                categoryId,
                colorId,
                sizes: {
                    deleteMany: {},
                },
                isFeatured,
                isArchived,
            },
        });

        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
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
            },
        });

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("[PRODUCT_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string; productId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.productId) {
            return new NextResponse("Billboard ID is required", {
                status: 400,
            });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            },
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const product = await prismadb.product.delete({
            where: {
                id: params.productId,
            },
        });

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("[PRODUCT_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
