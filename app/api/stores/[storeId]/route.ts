import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        const store = await prismadb.store.update({
            where: {
                id: params.storeId,
                userId,
            },
            data: {
                name,
            },
        });

        return NextResponse.json(store, { status: 200 });
    } catch (error) {
        console.log("[STORE_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        const store = await prismadb.store.delete({
            where: {
                id: params.storeId,
                userId,
            },
        });

        return NextResponse.json(store, { status: 200 });
    } catch (error) {
        console.log("[STORE_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
