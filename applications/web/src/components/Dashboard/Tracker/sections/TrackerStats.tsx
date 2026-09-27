import React from "react";
import { CreditCard, TrendingUp, Coins, Zap } from "lucide-react";
import { formatDateValue, formatDateLabel } from "@ecowat/shared";
import { useTranslations } from "next-intl";

export interface TrackerStatsProps {
  selectedDateStr: string;
  selectedDateObject: Date;
  selectedDayCost: number;
  past30DaysCost: number;
  past30DaysSavings: number;
  appliancesCount: number;
}

const TrackerStats = ({
  selectedDateStr,
  selectedDateObject,
  selectedDayCost,
  past30DaysCost,
  past30DaysSavings,
  appliancesCount,
}: TrackerStatsProps) => {
  const t = useTranslations("Tracker.stats");
  const isTodaySelected = selectedDateStr === formatDateValue(new Date());

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Cost Card (Dynamic: selected day cost vs today cost) */}
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {isTodaySelected
              ? t("todayCost")
              : t("dayCost", { date: formatDateLabel(selectedDateObject) })}
          </span>
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <CreditCard className="h-4 w-4 fill-emerald-500/20" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-baseline">
            <span className="text-lg font-semibold text-slate-400 dark:text-stone-500 mr-0.5">
              €
            </span>
            {selectedDayCost.toFixed(2)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
          <span>{t("dayCostSubtitle")}</span>
        </div>
      </div>

      {/* Past 30 Days Cost Card */}
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {t("past30DaysCost")}
          </span>
          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
            <TrendingUp className="h-4 w-4 fill-blue-500/20" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-baseline">
            <span className="text-lg font-semibold text-slate-400 dark:text-stone-500 mr-0.5">
              €
            </span>
            {past30DaysCost.toFixed(2)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
          <span>{t("past30DaysCostSubtitle")}</span>
        </div>
      </div>

      {/* Total Savings Card */}
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {t("past30DaysSavings")}
          </span>
          <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Coins className="h-4 w-4 fill-amber-500/20" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-baseline">
            <span className="text-lg font-semibold text-slate-400 dark:text-stone-500 mr-0.5">
              €
            </span>
            {past30DaysSavings.toFixed(2)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
          <span>{t("past30DaysSavingsSubtitle")}</span>
        </div>
      </div>

      {/* Total Logged Appliances Card */}
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {t("totalLoggedAppliances")}
          </span>
          <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500">
            <Zap className="h-4 w-4 fill-violet-500/20" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {appliancesCount}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
          <span>{t("totalLoggedAppliancesSubtitle")}</span>
        </div>
      </div>
    </div>
  );
};

export default TrackerStats;
