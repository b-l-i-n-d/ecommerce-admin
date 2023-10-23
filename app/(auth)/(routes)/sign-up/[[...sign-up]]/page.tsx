import { Metadata } from "next";
import { SignUpWithTheme } from "./components/sign-up-with-theme";

export const metadata: Metadata = {
    title: "Ecommerce | Sign Up",
    description: "Sign up for an account.",
};

export default function Page() {
    return <SignUpWithTheme />;
}
