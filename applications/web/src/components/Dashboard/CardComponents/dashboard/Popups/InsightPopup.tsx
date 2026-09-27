"use client";
import React from "react";
import {
  X,
  TrendingDown,
  AlertTriangle,
  Leaf,
  Zap,
  Sparkles,
  Clock,
  Check,
} from "lucide-react";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { Recommendation, AvoidRecommendation } from "@ecowat/shared";
import { useTranslations } from "next-intl";

type InsightPopupProps = {
  item: Recommendation | AvoidRecommendation;
  type: "recommendation" | "avoid";
  onClose: () => void;
};

const InsightPopup = ({ item, type, onClose }: InsightPopupProps) => {
  const t = useTranslations("Dashboard.popups.insightPopup");
  const isRec = type === "recommendation";

  // Safe cast / read properties depending on type
  const recItem = item as Recommendation;
  const avoidItem = item as AvoidRecommendation;

  const timeSlot = isRec ? recItem.bestTimeSlot : avoidItem.avoidTimeSlot;
  const savingOrCost = isRec
    ? `Save €${recItem.potentialSaving.toFixed(2)}`
    : `Avoid €${avoidItem.priceAtAvoidTime.toFixed(2)} extra`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-zinc-800/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 z-10">
        {/* Decorative Top Accent Line */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${
            isRec ? "from-emerald-500 to-cyan-500" : "from-rose-500 to-red-500"
          }`}
        />

        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/60">
          <div className="flex items-center gap-2.5">
            <div
              className={`h-9.5 w-9.5 rounded-xl flex items-center justify-center shrink-0 ${
                isRec
                  ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400"
              }`}
            >
              {getApplianceIcon(item.category)}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {item.appliance}
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {t("optimizationInsights")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-7 w-7 rounded-lg border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111111] hover:bg-slate-50 dark:hover:bg-[#1c1c1c] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Compact Highlight Card */}
          <div
            className={`p-4 rounded-xl border ${
              isRec
                ? "bg-emerald-500/2 border-emerald-100/60 dark:border-emerald-950/20 text-emerald-800 dark:text-emerald-300"
                : "bg-rose-500/2 border-rose-100/60 dark:border-rose-950/20 text-rose-800 dark:text-rose-300"
            }`}
          >
            <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-85 mb-1 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              {isRec
                ? t("benefitsRec")
                : t("benefitsAvoid")}
            </h4>
            <p className="text-xs font-semibold leading-relaxed mb-2.5">
              {isRec
                ? `Run your ${item.appliance} during the optimal window to maximize efficiency and minimize cost.`
                : `Avoid running your ${item.appliance} during peak high-cost hours.`}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-medium opacity-90">
              <Clock className="h-3.5 w-3.5" />
              <span>
                {t("timeSlot")} <strong className="font-bold">{timeSlot}</strong>
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Metric 1 */}
            <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-[#141414] border border-slate-100 dark:border-zinc-800/40">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-0.5">
                {isRec ? t("financialSavings") : t("avoidedPenalty")}
              </span>
              <span
                className={`text-xs font-extrabold flex items-center gap-1 ${
                  isRec
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-455"
                }`}
              >
                {isRec ? (
                  <TrendingDown className="h-3.5 w-3.5" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5" />
                )}
                {savingOrCost}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-[#141414] border border-slate-100 dark:border-zinc-800/40">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-0.5">
                {t("renewableShare")}
              </span>
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                <Leaf className="h-3.5 w-3.5 text-emerald-500" />
                {item.renewableScore}% {t("clean")}
              </span>
            </div>

            {/* Metric 3 */}
            <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-[#141414] border border-slate-100 dark:border-zinc-800/40">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-0.5">
                {isRec ? t("electricityPrice") : t("riskScore")}
              </span>
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                {isRec ? (
                  <>
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                    {recItem.priceAtBestTime === 0
                      ? t("free")
                      : `€${recItem.priceAtBestTime.toFixed(4)}`}
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                    {avoidItem.riskScore}% {t("risk")}
                  </>
                )}
              </span>
            </div>

            {/* Metric 4 */}
            <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-[#141414] border border-slate-100 dark:border-zinc-800/40">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-0.5">
                {isRec ? t("ecoEfficiency") : t("gridLoadState")}
              </span>
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                {isRec ? `${recItem.score}% ${t("score")}` : t("highLoadPeak")}
              </span>
            </div>
          </div>

          {/* Why section */}
          {item.reasons && item.reasons.length > 0 && (
            <div className="space-y-2 pt-1">
              <h5 className="text-[10px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                {t("whyTitle")}
              </h5>
              <div className="space-y-1.5">
                {item.reasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-[10px] text-slate-650 dark:text-slate-350 leading-relaxed bg-slate-50/30 dark:bg-zinc-950/20 p-2.5 rounded-lg border border-slate-100/50 dark:border-zinc-900/40"
                  >
                    <span
                      className={`h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isRec
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-450"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-455"
                      }`}
                    >
                      {isRec ? (
                        <Check className="h-2.5 w-2.5" />
                      ) : (
                        <AlertTriangle className="h-2.5 w-2.5" />
                      )}
                    </span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50/50 dark:bg-zinc-900/10 border-t border-slate-100 dark:border-zinc-800/60 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-xs font-bold text-white shadow-xs cursor-pointer hover:brightness-105 active:scale-98 transition-all ${
              isRec
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-rose-500 hover:bg-rose-600"
            }`}
          >
            {t("gotIt")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightPopup;
