import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

import { ModalProvider } from "@/providers/modal-provider";
import NProgressProviders from "@/providers/nprogress-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ecommerce Admin",
    description: "Ecommerce Admin",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <NProgressProviders>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                        >
                            <ModalProvider />
                            <Toaster />
                            {children}
                        </ThemeProvider>
                    </NProgressProviders>
                </body>
            </html>
        </ClerkProvider>
    );
}
