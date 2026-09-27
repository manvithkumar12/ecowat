import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { Coins, Info } from "lucide-react";
import { useTranslations } from "next-intl";

const LivePrice = ({
  currentPrice,
  priceUnit,
}: {
  currentPrice: number;
  priceUnit: string;
}) => {
  const t = useTranslations("Tracker.livePrice");
  return (
    <Card className="border border-slate-200 dark:border-[#1e1e1e] bg-linear-to-br from-white to-slate-50/50 dark:from-[#111111] dark:to-[#1a1a1a]/45 shadow-sm rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
        <Coins className="h-24 w-24 text-emerald-500" />
      </div>
      <CardHeader className="pb-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-slate-900 dark:text-stone-100 flex items-center gap-2">
            {t("title")}
          </CardTitle>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 rounded-full">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {t("liveRate")}
            </span>
          </div>
        </div>
        <CardDescription className="text-xs text-slate-500 dark:text-stone-400 leading-snug">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-500 flex items-baseline gap-0.5">
          <span className="text-2xl font-semibold text-emerald-500/80 mr-0.5">
            €
          </span>
          {currentPrice.toFixed(4)}
          <span className="text-xs font-semibold text-slate-450 dark:text-stone-500 font-sans ml-1">
            /{priceUnit.split("/")[1] || "kWh"}
          </span>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-stone-900/60 text-[10px] text-slate-400 dark:text-stone-500 font-semibold flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Info className="h-3 w-3 text-slate-400" />
            {t("gridSubject")}
          </span>
          <span className="font-mono">{t("engine")}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePrice;
