import { Metadata } from "next";
import ForecastClient from "@/src/components/Dashboard/Forecast/ForecastSection";

export const metadata: Metadata = {
  title: "Forecast Center",
  description:
    "Analyze future energy consumption, electricity pricing trends, renewable availability, and AI-powered scheduling optimization.",
};

export default async function ForecastPage() {
  return <ForecastClient />;
}
