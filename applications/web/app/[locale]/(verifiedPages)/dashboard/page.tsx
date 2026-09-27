import DashboardClient from "@/src/components/Dashboard/DashboardSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Energy Intelligence Dashboard",
  description:
    "Predictive household energy forecasting, smart schedule optimization, electricity cost analysis, and renewable grid integration.",
};
export default async function DashboardPage() {
  return <DashboardClient />;
}
