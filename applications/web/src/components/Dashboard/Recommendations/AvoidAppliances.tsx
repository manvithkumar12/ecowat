"use client";
import { AlertTriangle, Clock } from "lucide-react";
import { useRecommendations } from "@/src/context/useRecommendations.Context";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { getTranslatedReason } from "@/src/utils/recommendations/translateReason";
import { useTranslations } from "next-intl";

const AvoidAppliances = () => {
  const t = useTranslations("Recommendations.avoidAppliances");
  const tReasons = useTranslations("Recommendations.reasons");
  const {
    AvoidAppliances: avoidApplianceRecs,
    isLoading,
    isError,
    refetch,
  } = useRecommendations();
  if (isLoading) {
    return (
      <section className="space-y">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-stone-100 mb-4">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 bg-slate-100 dark:bg-zinc-900 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-4">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {avoidApplianceRecs.map((rec) => {
          const numericPenalty = rec.priceAtAvoidTime;

          return (
            <div
              key={rec.appliance}
              className="bg-linear-to-b from-white to-slate-50/50 dark:from-[#0d0d0d] dark:to-[#050505] border border-slate-200 dark:border-[#1e1e1e] rounded-2xl shadow-xs hover:shadow-md hover:border-rose-500/20 transition-all duration-300 p-5 flex flex-col relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-rose-500 to-red-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  {getApplianceIcon(rec.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-stone-100 truncate">
                      {rec.appliance}
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      {t("risk")}: {rec.riskScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Peak Hours Row */}
              <div className="mt-5 flex items-center justify-between border-b border-slate-100 dark:border-stone-850 pb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-stone-500" />
                  <span className="text-xs text-slate-500 dark:text-stone-400 font-medium">
                    {t("peakLoadHours")}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-rose-650 dark:text-rose-455 bg-rose-50/50 dark:bg-rose-950/10 px-2.5 py-0.5 rounded border border-rose-100/60 dark:border-rose-950/20 shadow-xs">
                  {rec.avoidTimeSlot}
                </span>
              </div>

              {/* Penalty & Warning Block */}
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-stone-500 font-medium">
                    {t("estimatedPenalty")}
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    €{numericPenalty.toFixed(4)}
                  </span>
                </div>

                <div className="flex items-start gap-2 mt-4 pt-3.5 border-t border-slate-100 dark:border-stone-850 text-[10px] leading-relaxed text-slate-500 dark:text-stone-400">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{getTranslatedReason(rec.reasons?.[0], tReasons)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AvoidAppliances;
