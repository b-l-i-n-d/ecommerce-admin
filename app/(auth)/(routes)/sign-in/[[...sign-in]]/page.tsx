import { Metadata } from "next";
import { SignInWithTheme } from "./components/sign-in-with-theme";

export const metadata: Metadata = {
    title: "Ecommerce | Sign In",
    description: "Sign in to your account.",
};

export default function Page() {
    return <SignInWithTheme />;
}
