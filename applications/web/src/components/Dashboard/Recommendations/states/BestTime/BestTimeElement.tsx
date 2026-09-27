import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { getTranslatedReason } from "@/src/utils/recommendations/translateReason";
import { Recommendation } from "@ecowat/shared";
import { Clock, Leaf, TrendingDown, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const BestTimeElement = ({ rec }: { rec: Recommendation }) => {
  const t = useTranslations("Recommendations.bestTime");
  const tReasons = useTranslations("Recommendations.reasons");

  return (
    <div className="bg-linear-to-b from-white to-slate-50/50 dark:from-[#0d0d0d] dark:to-[#050505] border border-slate-200 dark:border-[#1e1e1e] rounded-2xl shadow-xs hover:shadow-md hover:border-emerald-500/20 transition-all duration-300 p-5 flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          {getApplianceIcon(rec.category)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
            {rec.appliance}
          </h3>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingDown className="h-3.5 w-3.5" />
            <span>{t("saveAmount", { amount: rec.potentialSaving.toFixed(2) })}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            {t("ecoScore")}
          </span>
          <span className="text-sm font-black text-slate-800 dark:text-white">
            {rec.score}%
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-slate-50/60 dark:bg-[#141414]/60 border border-slate-100 dark:border-[#1e1e1e] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            {t("bestWindow")}
          </span>
        </div>
        <span className="text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-[#1e1e1e] px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-[#2b2b2b] shadow-xs">
          {rec.bestTimeSlot}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 px-1">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
            <Leaf className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold block">
              {t("renewableShare")}
            </span>
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
              {rec.renewableScore}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold block">
              {t("energyPrice")}
            </span>
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
              {rec.priceAtBestTime === 0
                ? t("free")
                : `${(rec.priceAtBestTime * 100).toFixed(1)} ct/kWh`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold block">
              {t("estCost")}
            </span>
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
              €{rec.estimatedRunCost?.toFixed(2) ?? "0.00"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-green-500/10 dark:bg-green-500/20 text-green-500 flex items-center justify-center shrink-0">
            <TrendingDown className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold block">
              {t("saving")}
            </span>
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
              €{rec.potentialSaving.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {rec.reasons && rec.reasons.length > 0 && (
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-[#1e1e1e] space-y-1.5">
          {rec.reasons.map((reason, index) => (
            <div
              key={index}
              className="flex mt-2 items-start gap-2 text-[11px] leading-relaxed text-slate-700 dark:text-stone-400"
            >
              <span className="h-1 w-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>{getTranslatedReason(reason, tReasons)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestTimeElement;
