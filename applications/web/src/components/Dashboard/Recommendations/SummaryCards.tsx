"use client";
import { useRecommendations } from "@/src/context/useRecommendations.Context";
import { useRenewableScore } from "@/src/context/useRenewable.context";
import { TrendingDown, Lightbulb, Leaf } from "lucide-react";
import { useTranslations } from "next-intl";

type CardData = {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const SummaryCards = () => {
  const t = useTranslations("Recommendations.summaryCards");
  const Data = useRecommendations();
  const RecommendationsData = Data.recommendations;
  const avoidAppliances = Data.AvoidAppliances;
  const renewablePercentage = useRenewableScore().renewableData;
  const totalSavings = RecommendationsData?.reduce(
    (curr, next) => curr + next.potentialSaving,
    0,
  );
  const summaryCardsData: CardData[] = [
    {
      title: t("potentialSavings"),
      value: `€ ${totalSavings?.toFixed(2)}` || "N/A",
      description: t("potentialSavingsDesc"),
      icon: TrendingDown,
      color:
        "text-emerald-500 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/20",
    },
    {
      title: t("recommendedActions"),
      value: `${RecommendationsData?.length.toString()} ${t("appliances")}` || "N/A",
      description: t("recommendedActionsDesc"),
      icon: Lightbulb,
      color:
        "text-amber-500 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-500/20",
    },
    {
      title: t("appliancesToAvoid"),
      value: `${avoidAppliances.length.toString()} ${t("appliances")}` || "N/A",
      description: t("appliancesToAvoidDesc"),
      icon: Lightbulb,
      color:
        "text-amber-500 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-500/20",
    },
    {
      title: t("renewableAvailability"),
      value: `${renewablePercentage?.score}%`,
      description: t("renewableAvailabilityDesc"),
      icon: Leaf,
      color:
        "text-emerald-500 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCardsData.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white dark:bg-[#111111] border border-slate-200/80 dark:border-stone-800 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-xs hover:border-slate-300 dark:hover:border-stone-700 transition-all duration-300 flex flex-col justify-between min-h-35 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${card.color} shrink-0`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-stone-500">
                  {card.title}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {card.value}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-stone-500 block mt-0.5">
                  {card.description}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
