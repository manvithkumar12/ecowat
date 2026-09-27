import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CurrentPriceResponse } from "@/app/api/actions/priceData/ProcessPriceData";
import NullData from "@/src/components/generalComponents/NullData";
import { getGermanTime, getGermanDate } from "@ecowat/shared";
import { X, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const HourlyPrice = ({
  setIsModalOpen,
  PriceData,
}: {
  setIsModalOpen: (val: boolean) => void;
  PriceData: CurrentPriceResponse | undefined;
}) => {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Dashboard.popups.hourlyPrice");

  useEffect(() => {
    setMounted(true);
  }, []);

  const now = Date.now();
  const orderedHours = PriceData?.hourlyPrices;

  if (!mounted) return null;

  if (!PriceData)
    return (
      <NullData
        Action1={() => setIsModalOpen(false)}
        Action2={() => setIsModalOpen(false)}
        title={t("title")}
        info={"No Price Data Available"}
        description={
          "No hourly price data is available yet. Please try again later."
        }
      />
    );

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-[#1e1e1e] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="h-4.5 w-4.5 text-emerald-500 fill-emerald-500/10" />
              {t("title")}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t("subtitle")}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="h-8 w-8 rounded-lg border border-slate-200 dark:border-[#2a2a2a] hover:bg-slate-50 dark:hover:bg-[#1c1c1c] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 text-slate-700 dark:text-slate-350">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-150 dark:border-stone-850 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                <th className="py-2.5 font-bold">{t("timeWindow")}</th>
                <th className="py-2.5 text-right font-bold">
                  {t("price")} ({PriceData?.unit || "N/A"})
                </th>
                <th className="py-2.5 text-right font-bold">{t("status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-stone-850/60 text-xs font-semibold">
              {orderedHours?.map((item: any, idx: any) => {
                const startTime = getGermanTime(item.start);
                const endTime = getGermanTime(item.end);

                const todayString = getGermanDate(now);
                const itemString = getGermanDate(item.start);
                const isDifferentDay = todayString !== itemString;

                const dayName = new Date(item.start)
                  .toLocaleDateString("en-DE", {
                    weekday: "short",
                    timeZone: "Europe/Berlin",
                  })
                  .toLowerCase();

                const isCurrent = now >= item.start && now < item.end;
                const isPast = item.end < now;

                const isCheap = item.price <= PriceData.todayAveragePrice * 0.9;
                const isPeak = item.price >= PriceData.todayAveragePrice * 1.1;

                return (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/50 dark:hover:bg-stone-900/10 transition-colors ${
                      isCurrent
                        ? "bg-emerald-500/5 dark:bg-emerald-500/10"
                        : isPast
                          ? "opacity-70"
                          : ""
                    }`}
                  >
                    <td className="py-3 text-slate-800 dark:text-slate-200">
                      {startTime} - {endTime}
                      {isDifferentDay && (
                        <span className="ml-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                          ({dayName})
                        </span>
                      )}
                      {isCurrent && (
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-emerald-500/10 text-emerald-500 uppercase tracking-wide">
                          {t("current")}
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right text-slate-750 dark:text-slate-350 font-mono font-semibold">
                      {item.price.toFixed(4)}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          isCheap
                            ? "bg-emerald-500/10 text-emerald-500"
                            : isPeak
                              ? "bg-rose-500/10 text-rose-500"
                              : "bg-slate-500/10 text-slate-500"
                        }`}
                      >
                        {isCheap ? t("cheap") : isPeak ? t("peak") : t("normal")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-[#1e1e1e] bg-slate-50/50 dark:bg-stone-900/20 flex justify-between items-center text-xs">
          <div className="flex flex-col">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              {t("average")}{" "}
              <strong className="text-slate-800 dark:text-slate-200">
                {PriceData?.todayAveragePrice} {PriceData?.unit}
              </strong>
            </span>

            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
              {t("source")}
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-sm"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default HourlyPrice;
