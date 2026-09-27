import { Button } from "@/shadcn/ui/button";
import { Card } from "@/shadcn/ui/card";
import { RefreshCw } from "lucide-react";

export function PriceHistoryError({
  refetch,
  t,
}: {
  refetch?: () => Promise<unknown> | void;
  t: (key: string) => string;
}) {
  return (
    <Card className="border-slate-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111111] p-12 text-center shadow-xs">
      <div className="flex flex-col items-center justify-center max-w-md mx-auto">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-500">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {t("errorTitle")}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {t("errorDesc")}
        </p>
        {refetch && (
          <Button
            onClick={() => void refetch()}
            className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 h-9 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            {t("retry")}
          </Button>
        )}
      </div>
    </Card>
  );
}
