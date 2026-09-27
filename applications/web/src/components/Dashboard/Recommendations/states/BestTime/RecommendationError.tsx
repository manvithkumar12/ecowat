"use client";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const RecommendationError = ({ handleRetry }: { handleRetry: () => void }) => {
  const tBestTime = useTranslations("Recommendations.bestTime");
  const tStates = useTranslations("Recommendations.states");

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-4">
        {tBestTime("title")}
      </h2>
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-8 rounded-2xl shadow-xs text-center flex flex-col items-center justify-center min-h-48">
        <AlertCircle className="h-8 w-8 text-rose-500 mb-3" />
        <span className="text-xs font-semibold text-slate-500 dark:text-stone-400 mb-4">
          {tStates("errorDesc")}
        </span>
        <button
          onClick={handleRetry}
          className="text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          {tStates("retry")}
        </button>
      </div>
    </section>
  );
};

export default RecommendationError;
