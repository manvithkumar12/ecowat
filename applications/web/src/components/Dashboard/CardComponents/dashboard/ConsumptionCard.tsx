"use client";

import { useContext, useState } from "react";
import { Activity, TrendingDown, TrendingUp } from "lucide-react";
import { ConsumptionDetails } from "./Popups/ConsumptionDetails";
import { UsedApplianceContext } from "@/src/context/usedAppliance.context";
import StatLoading from "@/src/components/statsElements/StatLoading";
import StatError from "@/src/components/statsElements/StatError";
import { useTranslations } from "next-intl";

const ConsumptionCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const context = useContext(UsedApplianceContext);
  const t = useTranslations("Dashboard.consumptionCard");

  if (!context) return null;
  const isLoading = context.isLoading;
  const isError = context.isError;
  const ConsumptionData = context.Appliances;
  const ConsumptioRefetch = context.refetch;
  const total = context.totalKwh ?? 0;
  const yesterdayUsage = context.YesterdayUsage ?? 0;
  const isNewUsage = yesterdayUsage === 0 && total > 0;
  const percentageChange =
    yesterdayUsage > 0
      ? ((total - yesterdayUsage) / yesterdayUsage) * 100
      : null;
  const comparedValue =
    total > yesterdayUsage ? "more" : total < yesterdayUsage ? "less" : "same";

  if (isLoading || (!ConsumptionData && !isError)) {
    return <StatLoading />;
  }

  if (isError) {
    return <StatError refetch={ConsumptioRefetch} />;
  }

  return (
    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden min-h-37">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {t("title")}
        </span>
        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <Activity className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {total ?? "N/A"}
          <span className="text-xs font-semibold text-slate-400 ml-0.5">
            Kwh
          </span>
        </span>
        <span
          className={`text-[10px] font-bold flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${
            isNewUsage
              ? "text-blue-500 bg-blue-500/10"
              : comparedValue === "more"
                ? "text-red-500 bg-red-500/10"
                : comparedValue === "less"
                  ? "text-emerald-500 bg-emerald-500/10"
                  : "text-slate-500 bg-slate-500/10"
          }`}
        >
          {comparedValue === "more" ? (
            <TrendingUp className="h-3 w-3" />
          ) : comparedValue === "less" ? (
            <TrendingDown className="h-3 w-3" />
          ) : null}

          {percentageChange !== null ? (
            <>
              {comparedValue === "more" && "+"}
              {comparedValue === "less" && "-"}
              {Math.abs(percentageChange).toFixed(1)}%
            </>
          ) : total > 0 ? (
            t("new")
          ) : (
            "0%"
          )}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
        <span>{t("vsYesterday")}</span>{" "}
        <svg
          className={`w-16 h-6 fill-none stroke-2 ${
            isNewUsage
              ? "stroke-blue-500"
              : comparedValue === "more"
                ? "stroke-red-500"
                : comparedValue === "less"
                  ? "stroke-emerald-500"
                  : "stroke-slate-400"
          }`}
        >
          <path
            d={
              comparedValue === "less"
                ? "M 0,15 Q 16,2 32,12 T 64,5"
                : "M 0,5 Q 16,18 32,8 T 64,15"
            }
          />
        </svg>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1e1e1e] flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[10px] mt-2 font-bold text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          {t("viewBreakdown")}
        </button>
      </div>

      {isModalOpen && (
        <ConsumptionDetails
          setIsModalOpen={setIsModalOpen}
          totalConsumption={total ?? 0}
          recentApplications={ConsumptionData}
        />
      )}
    </div>
  );
};

export default ConsumptionCard;
