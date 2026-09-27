import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const LoadingChart = () => {
  const t = useTranslations("Forecast.states");

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 text-center select-none py-12">
      <div className="relative flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 animate-spin" />
        <Sparkles className="absolute h-5 w-5 text-emerald-500 animate-pulse" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-800 dark:text-stone-200">
          {t("loadingTitle")}
        </h3>
        <p className="text-xs text-slate-500 dark:text-stone-400 max-w-sm">
          {t("loadingDesc")}
        </p>
      </div>
    </div>
  );
};

export default LoadingChart;
