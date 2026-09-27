"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { useCarbonEmissionContext } from "@/src/context/useCarbonEmissions";
import { BarChart2, TrendingUp, Leaf, RefreshCw } from "lucide-react";
import StatLoading from "../../statsElements/StatLoading";
import StatError from "../../statsElements/StatError";
import { carbonFootprintData, KpiCard } from "@ecowat/shared";
import { useTranslations } from "next-intl";

const KpiCards = () => {
  const t = useTranslations("Footprint.kpis");
  const { data, isLoading, isError, refetch } = useCarbonEmissionContext();
  const iconMap = {
    BarChart2,
    TrendingUp,
    Leaf,
    RefreshCw,
  } as const;

  const getTitle = (title: string) => {
    switch (title) {
      case "Weekly Emissions":
        return t("weeklyEmissions");
      case "Monthly Emissions":
        return t("monthlyEmissions");
      case "Estimated CO₂ Reduction":
        return t("estCo2Reduction");
      case "Sustainability Score":
        return t("sustainabilityScore");
      default:
        return title;
    }
  };

  if (isLoading) {
    return <StatLoading />;
  }
  if (isError) {
    return <StatError refetch={refetch} />;
  }
  const refined_data: KpiCard[] = carbonFootprintData(
    data?.weeklyValue.toFixed(2) ?? "N/A",
    data?.monthlyValue.toFixed(2) ?? "N/A",
  );
  
  return (
    <>
      {refined_data.map((card) => {
        const Icon = iconMap[card.icon as keyof typeof iconMap] ?? BarChart2;
        return (
          <Card
            key={card.title}
            className="border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-stone-800 dark:bg-[#0c0a09]"
          >
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-md bg-emerald-100 p-2 dark:bg-emerald-900/30">
                <Icon className="h-5 w-5 text-emerald-500" />
              </div>
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-stone-400">
                {getTitle(card.title)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-slate-900 dark:text-stone-100">
                {card.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default KpiCards;
