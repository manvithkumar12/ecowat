import { useTranslations } from "next-intl";
import React from "react";

type StatErrorProps = {
  refetch?: () => Promise<unknown>;
};

const StatError = ({ refetch }: StatErrorProps) => {
  const t = useTranslations("Dashboard.popups.statError");

  return (
    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-37 text-center">
      <span className="text-xs font-semibold text-rose-500">
        {t("message")}
      </span>

      <button
        onClick={() => void refetch?.()}
        className="mt-3 text-[10px] font-bold text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
      >
        {t("retry")}
      </button>
    </div>
  );
};

export default StatError;
