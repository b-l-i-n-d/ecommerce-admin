import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
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

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId,
            },
        });

        return NextResponse.json(billboards, { status: 201 });
    } catch (error) {
        console.log("[BILLBOARDS_GET", error);
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

        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!label) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image is required", { status: 400 });
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

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId,
            },
        });

        return NextResponse.json(billboard, { status: 201 });
    } catch (error) {
        console.log("[BILLBOARDS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
