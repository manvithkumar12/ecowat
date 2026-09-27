"use client";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const RecommendationEmpty = () => {
  const tBestTime = useTranslations("Recommendations.bestTime");
  const tStates = useTranslations("Recommendations.states");

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-4">
        {tBestTime("title")}
      </h2>
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-8 rounded-2xl text-center">
        <Sparkles className="h-8 w-8 text-amber-500 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {tStates("emptyTitle")}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          {tStates("emptyDesc")}
        </p>
      </div>
    </section>
  );
};

export default RecommendationEmpty;
