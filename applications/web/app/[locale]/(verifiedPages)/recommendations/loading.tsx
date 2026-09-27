"use client";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const Loading = () => {
  const t = useTranslations("Recommendations.states");
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
      <Loader2 className="h-12 w-12 text-emerald-500 animate-spin" />
      <p className="text-lg text-slate-600 dark:text-stone-400 font-medium">
        {t("loading")}
      </p>
    </div>
  );
};

export default Loading;
