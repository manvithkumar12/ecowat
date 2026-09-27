"use client";

import MlToolTip from "@/src/components/generalComponents/MlToolTip";
import { useTranslations } from "next-intl";

export const WeekPriceError = ({ onRetry }: { onRetry: () => void }) => {
  const t = useTranslations("Dashboard.priceForecast");

  return (
    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col h-100">
      <div className="mb-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {t("title")}
        </h3>
        <span className="w-full flex gap-2 items-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t("subtitle")}
          </p>
          <MlToolTip mlauto />
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-6">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {t("failedTitle")}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-50">
            {t("failedDesc")}
          </p>
        </div>
        <button
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium
              bg-red-500 hover:bg-red-600 active:bg-red-700 text-white
              transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          {t("retry")}
        </button>
      </div>
    </div>
  );
};

export default WeekPriceError;
