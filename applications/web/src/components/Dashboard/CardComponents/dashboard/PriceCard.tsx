"use client";
import { useContext, useState } from "react";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import HourlyPrice from "./Popups/HourlyPrice";
import { LivePriceContext } from "@/src/context/usePriceData";
import StatLoading from "@/src/components/statsElements/StatLoading";
import StatError from "@/src/components/statsElements/StatError";
import { useTranslations } from "next-intl";

const PriceCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const context = useContext(LivePriceContext);
  const isPriceLoading = context?.isPriceLoading;
  const PriceData = context?.PriceData;
  const priceError = context?.priceError;
  const PriceRefetch = context?.refetch;
  const t = useTranslations("Dashboard.priceCard");

  if (isPriceLoading || (!PriceData && !priceError)) {
    return <StatLoading />;
  }

  if (priceError) {
    return <StatError refetch={PriceRefetch} />;
  }

  const isLower = PriceData?.priceTrend === "lower";

  return (
    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {t("currentPrice")}
        </span>
        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <Zap className="h-4 w-4 fill-emerald-500/20" />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {PriceData?.currentPrice ?? "N/A"}
          <span className="text-xs font-semibold text-slate-400 ml-0.5">
            {PriceData?.unit ?? "N/A"}
          </span>
        </span>
        <span
          className={`text-[10px] font-bold flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${
            isLower
              ? "text-emerald-500 bg-emerald-500/20"
              : "text-rose-500 bg-rose-500/20"
          }`}
        >
          {isLower ? (
            <TrendingDown className="h-3 w-3" />
          ) : (
            <TrendingUp className="h-3 w-3" />
          )}
          {isLower ? "-" : "+"}
          {PriceData?.percentageChange ?? "N/A"}%
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
        <span>{t("vsAverage")}</span>
        {/* Mini trend sparkline */}
        <svg
          className={`w-16 h-6 fill-none stroke-2 ${isLower ? "stroke-emerald-500" : "stroke-rose-500"}`}
        >
          {isLower ? (
            <path d="M 0,5 Q 16,12 32,4 T 64,18" />
          ) : (
            <path d="M 0,15 Q 16,8 32,18 T 64,5" />
          )}
        </svg>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1e1e1e] flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[10px] font-bold text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          {t("viewHourlyData")}
        </button>
      </div>

      {isModalOpen && (
        <HourlyPrice PriceData={PriceData} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default PriceCard;
