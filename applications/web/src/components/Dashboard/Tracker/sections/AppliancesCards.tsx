import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { Availableappliances } from "@ecowat/shared";
import { useTranslations } from "next-intl";

const AppliancesCards = ({ appliancesList }: { appliancesList: any[] }) => {
  const t = useTranslations("Tracker.card");
  return (
    <>
      {appliancesList.map((app) => (
        <Card
          key={app.id}
          className="group relative overflow-hidden transition-all duration-200 hover:shadow-md border border-slate-200 dark:border-stone-850 bg-white dark:bg-[#0c0a09] rounded-2xl"
        >
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-3 border-b border-slate-100 dark:border-stone-900/40">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-stone-900 text-slate-700 dark:text-stone-300 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                {getApplianceIcon(app.appliance.name) ?? ""}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-stone-100 truncate max-w-40 capitalize">
                  {Availableappliances.find(
                    (a) => a.dbName === app.appliance.name,
                  )?.name || app.appliance.name}
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-stone-400 font-mono mt-0.5 uppercase tracking-wide">
                  {t("loggedUsage")}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-stone-900/50">
              <div className="p-3.5 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-stone-500 mb-1">
                  {t("rating")}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-stone-200 font-mono">
                  {app.rating} W
                </span>
              </div>
              <div className="p-3.5 flex flex-col items-center justify-center text-center bg-slate-55 dark:bg-stone-900/10">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-stone-500 mb-1">
                  {t("duration")}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-stone-200 font-mono">
                  {app.usageHours.toFixed(1)} h
                </span>
              </div>
              <div className="p-3.5 flex flex-col items-center justify-center text-center bg-emerald-50/20 dark:bg-emerald-950/5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-stone-500 mb-1">
                  {t("calculated")}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {app.kwh.toFixed(2)} kWh
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 dark:border-stone-900/40 bg-slate-50/40 dark:bg-stone-900/10">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-stone-500">
                  {t("totalPrice")}
                </span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-stone-100 flex items-baseline">
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-stone-500 mr-0.5">
                    €
                  </span>
                  {app.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default AppliancesCards;
