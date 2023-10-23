import { NextResponse } from "next/server";
import Stripe from "stripe";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
    req: Request,
    {
        params,
    }: {
        params: { storeId: string };
    }
) {
    const { items } = await req.json();

    if (!items || items.length === 0) {
        return new NextResponse("Product Ids are required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: items.map((item: any) => item.id),
            },
        },
        include: {
            images: true,
        },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
        const item = items.find((item: any) => item.id === product.id);

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: product.images.map((image) => image.url),
                },
                unit_amount: product.price.toNumber() * 100,
            },
            quantity: item.quantity,
        });
    });

    const order = await prismadb.order.create({
        data: {
            storeId: params.storeId,
            isPaid: false,
            orderItems: {
                create: items.map((item: any) => ({
                    product: {
                        connect: {
                            id: item.id,
                        },
                    },
                    size: {
                        connect: {
                            id: item.sizeId,
                        },
                    },
                    quantity: item.quantity,
                })),
            },
        },
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
        cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
        metadata: {
            orderId: order.id,
        },
    });

    return NextResponse.json(
        {
            url: session.url,
        },
        {
            headers: corsHeaders,
        }
    );
}
