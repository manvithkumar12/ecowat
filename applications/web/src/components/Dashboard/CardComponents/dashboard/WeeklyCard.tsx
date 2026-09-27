"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import WeeklyCostDetails from "./Popups/WeeklyCostDetails";
import StatLoading from "@/src/components/statsElements/StatLoading";
import StatError from "@/src/components/statsElements/StatError";
import { useTranslations } from "next-intl";
import { useUserWeeklyPrice } from "@/src/context/userWeeklyContext";

const WeeklyCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("Dashboard.weeklyCard");
  const {
    data: WeeklyCostData,
    isLoading,
    isError,
    refetch: weeklyRefetch,
    totalCost,
  } = useUserWeeklyPrice();
  console.log(WeeklyCostData);
  if (isLoading || (!WeeklyCostData && !isError)) {
    return <StatLoading />;
  }

  if (isError) {
    return <StatError refetch={weeklyRefetch} />;
  }

  return (
    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {t("title")}
        </span>
        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <Wallet className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {totalCost?.toFixed(2) ?? "N/A"} €
        </span>
      </div>
      <div className="mt-3 text-[10px] text-slate-400 dark:text-slate-500">
        <span>{t("subtitle")}</span>
      </div>

      <div className="mt-6 pt-3 border-t border-slate-100 dark:border-[#1e1e1e] flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[10px] mt-2 font-bold text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          {t("viewDailyCost")}
        </button>
      </div>

      {isModalOpen && (
        <WeeklyCostDetails
          WeeklyCostData={WeeklyCostData!}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default WeeklyCard;
