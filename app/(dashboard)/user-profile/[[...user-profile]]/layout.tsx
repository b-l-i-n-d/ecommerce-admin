import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "User Profile",
    description: "Manage your user profile.",
};

export default function UserProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-7xl mx-auto px-8 my-10 flex flex-row flex-wrap">
            <nav>
                <Link href="/">
                    <Button>
                        <ArrowLeftCircle size={24} className="mr-2" />
                        Go to Dasboard
                    </Button>
                </Link>
            </nav>
            {children}
        </div>
    );
}
