import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-08-16",
    typescript: true,
    appInfo: {
        name: "E-Commerce",
        version: "0.1.0",
    },
});
