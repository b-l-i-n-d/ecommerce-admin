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

    const products = [];

    for (const item of items) {
        const product = await prismadb.product.findUnique({
            where: {
                id: item.id,
            },
            include: {
                images: true,
                sizes: {
                    include: {
                        size: true,
                    },
                },
            },
        });

        if (!product) {
            return new NextResponse(`Product ${item.id} not found`, {
                status: 404,
            });
        }

        products.push(product);
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
        const product = products.find((p) => p.id === item.id);

        if (!product) {
            return new NextResponse(`Product ${item.id} not found`, {
                status: 404,
            });
        }

        const size = product.sizes.find((s) => s.size.id === item.selectedSize);

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: product.images.map((i) => i.url),
                    description: `Size: ${size?.size.name}`,
                },
                unit_amount: product.price.toNumber() * 100,
            },
            quantity: item.quantity,
        });
    }

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
                            id: item.selectedSize,
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
