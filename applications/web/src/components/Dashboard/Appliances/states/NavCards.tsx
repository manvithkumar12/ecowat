import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Appliance } from "@ecowat/shared";
import { CreditCard, Package, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";

const NavCards = ({
  appliancesQuery,
  activeAppliances,
}: {
  appliancesQuery: Appliance[] | undefined;
  activeAppliances: Appliance[] | undefined;
}) => {
  const t = useTranslations("Appliances.navCards");
  const TARIFF_PER_KWH = 0.35;

  const totalAppliancesCount = appliancesQuery?.length;

  const estimatedDailyConsumption = useMemo(() => {
    return appliancesQuery?.reduce((total, app) => {
      return total + (app.powerRatingW * app.dailyUsageHours) / 1000;
    }, 0);
  }, [activeAppliances]);

  const estimatedMonthlyCost = useMemo(() => {
    return estimatedDailyConsumption || 0 * 30 * TARIFF_PER_KWH;
  }, [estimatedDailyConsumption]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-stone-400">
            {t("totalAppliances")}
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <Package className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-stone-100">
            {totalAppliancesCount}
          </div>
          <p className="text-xs text-slate-500 dark:text-stone-400 mt-1">
            {activeAppliances?.length ?? "0"} {t("activeUnits")}
          </p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-stone-400">
            {t("estDailyConsumption")}
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-stone-100">
            {estimatedDailyConsumption?.toFixed(1) ?? "0"}{" "}
            <span className="text-sm font-semibold text-slate-500">kWh</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-stone-400 mt-1">
            {t("basedOnUsage")}
          </p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-stone-400">
            {t("estMonthlyCost")}
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-stone-100">
            {estimatedMonthlyCost.toFixed(2)}{" "} €
          </div>
          <p className="text-xs text-slate-500 dark:text-stone-400 mt-1">
            {t("projectedExpenditure")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavCards;
