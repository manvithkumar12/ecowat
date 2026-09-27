"use client";

import { useTranslations } from "next-intl";

export const PriceEmptyState = () => {
  const t = useTranslations("Dashboard.priceForecast");

  return (
    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col h-100">
      <div className="mb-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {t("title")}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {t("subtitle")}
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3 py-6">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-[#1a1a1a] flex items-center justify-center">
          <svg
            className="w-7 h-7 text-slate-400 dark:text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {t("noDataTitle")}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-50">
            {t("noDataDesc")}
          </p>
        </div>
      </div>
    </div>
  );
};
