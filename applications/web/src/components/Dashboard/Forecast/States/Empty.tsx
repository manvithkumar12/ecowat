import { Button } from "@/shadcn/ui/button";
import { TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface ForecastEmptyProps {
  onRetry?: () => void;
}

const EmptyChart = ({ onRetry }: ForecastEmptyProps) => {
  const router = useRouter();
  const t = useTranslations("Forecast.states");

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      router.refresh();
    }
  };

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-5 text-center select-none p-6 py-12">
      <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-stone-900/60 flex items-center justify-center text-slate-450 dark:text-stone-500 border border-slate-200/50 dark:border-stone-850">
        <TrendingUp className="h-8 w-8 stroke-[1.5]" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-800 dark:text-stone-200">
          {t("emptyTitle")}
        </h3>
        <p className="text-xs text-slate-500 dark:text-stone-400 max-w-xs leading-relaxed">
          {t("emptyDesc")}
        </p>
      </div>
      <Button
        onClick={handleRetry}
        className="rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs h-9"
      >
        {t("generateForecast")}
      </Button>
    </div>
  );
};

export default EmptyChart;
