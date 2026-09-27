"use client";
import { useTranslations } from "next-intl";
import React from "react";

const RecommendationLoading = () => {
  const t = useTranslations("Recommendations.bestTime");

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-4">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-xs min-h-56 animate-pulse flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-16 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="mt-4 h-12 w-full rounded bg-slate-100 dark:bg-slate-900" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="h-12 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-12 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendationLoading;
