"use client";
import { Card } from "@/shadcn/ui/card";
import { ArrowDownRight, Leaf, ShieldCheck } from "lucide-react";
import { ForecastKpiData } from "@ecowat/shared";
import { useTranslations } from "next-intl";

const trendIconMap = {
  ArrowDownRight,
  Leaf,
  ShieldCheck,
} as const;

const KpiCards = () => {
  const t = useTranslations("Forecast.kpiCards");

  const kpiTranslations: Record<string, { title: string; trend: string }> = {
    "Weekly Consumption": {
      title: t("weeklyConsumption"),
      trend: t("weeklyConsumptionTrend"),
    },
    "Predicted Weekly Cost": {
      title: t("predictedWeeklyCost"),
      trend: t("predictedWeeklyCostTrend"),
    },
    "CO₂ Emissions": {
      title: t("co2Emissions"),
      trend: t("co2EmissionsTrend"),
    },
    "Model Confidence": {
      title: t("modelConfidence"),
      trend: t("modelConfidenceTrend"),
    },
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {ForecastKpiData.map((card, index) => {
        const Icon =
          trendIconMap[card.trendIcon as keyof typeof trendIconMap] ??
          ArrowDownRight;
        const trans = kpiTranslations[card.title] || {
          title: card.title,
          trend: card.trend,
        };

        return (
          <Card
            key={index}
            className="border border-slate-250/70 dark:border-stone-850 bg-white dark:bg-[#0c0a09] shadow-xs relative overflow-hidden group hover:border-slate-350 dark:hover:border-stone-700 transition-colors flex items-center justify-between p-5"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 dark:text-stone-500 uppercase tracking-widest block">
                {trans.title}
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-stone-100 font-mono tracking-tight">
                {card.value}{" "}
                {card.unit && (
                  <span className="text-xs font-bold text-slate-400 dark:text-stone-500">
                    {card.unit}
                  </span>
                )}
              </h3>
              <div
                className={`flex items-center gap-1 text-[11px] font-bold ${card.trendColor}`}
              >
                <Icon className="h-3 w-3 shrink-0" />
                <span>{trans.trend}</span>
              </div>
            </div>

            {/* Mini Sparkline SVG */}
            <svg
              className={`w-16 h-10 ${card.sparklineColor} overflow-visible shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-200`}
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
            >
              <path
                d={card.sparklinePath}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Card>
        );
      })}
    </section>
  );
};

export default KpiCards;
