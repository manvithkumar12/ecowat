import LoginClient from "@/src/components/login/LoginSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to EcoWatt to forecast household energy usage, optimize appliance schedules, reduce electricity costs, and align consumption with renewable grid windows.",
};

export default async function LoginPage() {
  return <LoginClient />;
}
