"use client";
import { useState } from "react";
import { Leaf } from "lucide-react";
import RenewableDetails from "./Popups/RenewableDetails";
import { useRenewableScore } from "@/src/context/useRenewable.context";
import StatLoading from "@/src/components/statsElements/StatLoading";
import StatError from "@/src/components/statsElements/StatError";
import {
  statusColorMap,
  statusFillMap,
} from "@/src/utils/renewable/colour-utils";
import { useTranslations } from "next-intl";

const RenewableCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { renewableData, renewableError, renewableLoading, renewableRefetch } =
    useRenewableScore();
  const t = useTranslations("Dashboard.renewableCard");

  if (renewableLoading || (!renewableData && !renewableError)) {
    return <StatLoading />;
  }

  if (renewableError) {
    return <StatError refetch={renewableRefetch} />;
  }

  if (!renewableData) {
    return (
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-37 text-center">
        <span className="text-xs font-semibold text-slate-500 dark:text-stone-400">
          {t("noData")}
        </span>
        <button
          onClick={() => renewableRefetch()}
          className="mt-3 text-[10px] font-bold text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  const circleValue = statusFillMap[renewableData.status];
  const circleOffset = 125.6 - (125.6 * circleValue) / 100;

  return (
    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {t("title")}
        </span>
        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <Leaf className="h-4 w-4 fill-emerald-500/20" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {renewableData?.score ?? "N/A"}%
        </span>
        <div className="relative h-12 w-12 flex items-center justify-center">
          <svg className="h-full w-full transform -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              className="text-slate-100 dark:text-slate-800"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              className={statusColorMap[renewableData?.status]}
              strokeWidth="3.5"
              strokeDasharray="125.6"
              strokeDashoffset={circleOffset}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="absolute text-[7px] font-bold text-slate-700 dark:text-slate-300 text-center leading-none">
            {renewableData?.status}
            <br />
          </span>
        </div>
      </div>
      <div className="mt-3 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 hidden rounded-full ${statusColorMap[renewableData?.status]} animate-pulse`}
        />
        <span className="mr-auto">{t("availability")}</span>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1e1e1e] flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[10px] font-bold text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          {t("viewBestHours")}
        </button>
      </div>

      {isModalOpen && (
        <RenewableDetails
          RenewableData={renewableData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default RenewableCard;
