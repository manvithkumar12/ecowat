import RegisterClient from "@/src/components/register/RegisterSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | EcoWatt",
  description:
    "Create your EcoWatt account to start forecasting household energy usage, optimizing appliance schedules, and reducing electricity costs.",
};

export default async function RegisterPage() {
  return <RegisterClient />;
}
