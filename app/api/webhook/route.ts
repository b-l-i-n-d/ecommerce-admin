import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new Response(`WebHook error: ${error.message}`, { status: 400 });
    }

    const sessions = event.data.object as Stripe.Checkout.Session;

    const address = sessions?.customer_details?.address;

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ];

    const addressString = addressComponents
        .filter((c) => c !== null)
        .join(", ");

    if (event.type === "checkout.session.completed") {
        const order = await prismadb.order.update({
            where: {
                id: sessions?.metadata?.orderId,
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: sessions?.customer_details?.phone || "",
                name: sessions?.customer_details?.name || "",
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                        size: true,
                    },
                },
            },
        });

        await prismadb.$transaction([
            ...order.orderItems.map((item) =>
                prismadb.product.update({
                    where: {
                        id: item.product.id,
                    },
                    data: {
                        sizes: {
                            update: {
                                where: {
                                    id: item.size.id,
                                },
                                data: {
                                    stock: {
                                        decrement: item.quantity,
                                    },
                                },
                            },
                        },
                    },
                })
            ),
        ]);
    }

    return new NextResponse(null, { status: 200 });
}
