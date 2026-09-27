import NullData from "@/src/components/generalComponents/NullData";
import { UsedAppliance } from "@ecowat/shared";
import { Activity, X } from "lucide-react";
import { useTranslations } from "next-intl";

type ConsumptionDetailsProps = {
  setIsModalOpen: (val: boolean) => void;
  recentApplications: UsedAppliance[] | undefined;
  totalConsumption: number;
};

export const ConsumptionDetails = ({
  setIsModalOpen,
  recentApplications,
  totalConsumption,
}: ConsumptionDetailsProps) => {
  const t = useTranslations("Dashboard.popups.consumptionDetails");

  if (recentApplications?.length === 0) {
    return (
      <NullData
        Action1={() => setIsModalOpen(false)}
        Action2={() => setIsModalOpen(false)}
        title={t("title")}
        info={t("noApplicationsFound")}
        description={`${t("noAppliancesInfo")}`}
      />
    );
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-[#1e1e1e] flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-emerald-500 fill-emerald-500/10" />
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
                <th className="py-2.5 font-bold">{t("application")}</th>
                <th className="py-2.5 text-right font-bold">{t("rating")}</th>
                <th className="py-2.5 text-right font-bold">{t("usage")}</th>
                <th className="py-2.5 text-right font-bold">
                  {t("consumption")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-stone-850/60 text-xs font-semibold">
              {recentApplications?.map((appliance, index) => (
                <tr
                  key={appliance?.appliance?.name + index}
                  className="hover:bg-slate-50/50 dark:hover:bg-stone-900/10 transition-colors"
                >
                  <td className="py-3 text-slate-800 dark:text-slate-200">
                    <span className="mr-2 inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-emerald-500/10 text-emerald-500 uppercase tracking-wide">
                      #{index + 1}
                    </span>
                    {appliance?.appliance?.name ?? "N/A"}
                  </td>
                  <td className="py-3 text-right text-slate-750 dark:text-slate-350 font-mono font-semibold">
                    {appliance.rating}
                  </td>
                  <td className="py-3 text-right text-slate-750 dark:text-slate-350 font-mono font-semibold">
                    {appliance.usageHours}
                  </td>
                  <td className="py-3 text-right text-slate-750 dark:text-slate-350 font-mono font-semibold">
                    {appliance.kwh.toFixed(1)} kWh
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-[#1e1e1e] bg-slate-50/50 dark:bg-stone-900/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              {t("totalConsumption")}{" "}
              <strong className="text-slate-800 dark:text-slate-200">
                {totalConsumption.toFixed(1)} kWh
              </strong>
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {t("totalUsage")}{" "}
              {recentApplications
                ?.reduce((acc, curr) => acc + curr.usageHours, 0)
                .toFixed(0)}{" "}
              {t("acrossApps")}
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

export default ConsumptionDetails;
