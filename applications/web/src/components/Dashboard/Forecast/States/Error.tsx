import { Button } from "@/shadcn/ui/button";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface ForecastErrorProps {
  onRetry?: () => void;
}

const ErrorChart = ({ onRetry }: ForecastErrorProps) => {
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
      <div className="h-16 w-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
        <AlertTriangle className="h-8 w-8 stroke-[1.5]" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-800 dark:text-stone-200">
          {t("errorTitle")}
        </h3>
        <p className="text-xs text-slate-500 dark:text-stone-400 max-w-xs leading-relaxed">
          {t("errorDesc")}
        </p>
      </div>
      <Button
        onClick={handleRetry}
        className="rounded-xl border border-slate-200 dark:border-stone-850 hover:bg-slate-50 dark:hover:bg-stone-900 text-xs font-semibold h-9"
      >
        {t("retryForecast")}
      </Button>
    </div>
  );
};

export default ErrorChart;
