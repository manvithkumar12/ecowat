import { CalendarDays, Wallet, X } from "lucide-react";
import { useTranslations } from "next-intl";

type WeeklyCostData = {
  weeklyEstimatedCost: number;
  averageDailyCost: number;
  dayWiseCost: {
    day: string;
    cost: number;
    estimated: boolean;
  }[];
};

type WeeklyCostDetailsProps = {
  setIsModalOpen: (val: boolean) => void;
  WeeklyCostData: WeeklyCostData;
};

const WeeklyCostDetails = ({
  setIsModalOpen,
  WeeklyCostData,
}: WeeklyCostDetailsProps) => {
  const t = useTranslations("Dashboard.popups.weeklyCostDetails");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-[#1e1e1e] flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarDays className="h-4.5 w-4.5 text-emerald-500" />
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
                <th className="py-2.5 font-bold">{t("day")}</th>
                <th className="py-2.5 text-right font-bold">{t("cost")}</th>
                <th className="py-2.5 text-right font-bold">{t("status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-stone-850/60 text-xs font-semibold">
              {WeeklyCostData.dayWiseCost.map((item) => (
                <tr
                  key={item.day}
                  className="hover:bg-slate-50/50 dark:hover:bg-stone-900/10 transition-colors"
                >
                  <td className="py-3 text-slate-800 dark:text-slate-200">
                    {t(item.day.toLowerCase())}
                  </td>
                  <td className="py-3 text-right text-slate-750 dark:text-slate-350 font-mono font-semibold">
                    €{item.cost.toFixed(2)}
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        item.estimated
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-emerald-500/10 text-emerald-500"
                      }`}
                    >
                      {item.estimated ? t("estimated") : t("recorded")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-[#1e1e1e] bg-slate-50/50 dark:bg-stone-900/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-emerald-500" />
              {t("weeklyTotal")}{" "}
              <strong className="text-slate-800 dark:text-slate-200">
                €{WeeklyCostData.weeklyEstimatedCost.toFixed(2)}
              </strong>
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {t("averageDailyCost")} €
              {WeeklyCostData.averageDailyCost.toFixed(2)}
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
    </div>
  );
};

export default WeeklyCostDetails;
