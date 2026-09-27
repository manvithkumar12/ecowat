"use client";
import { useContext } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { CustomTooltip } from "./CustomTootlTip";
import { UsedApplianceContext } from "@/src/context/usedAppliance.context";
import { Availableappliances } from "@ecowat/shared";
import { LivePriceContext } from "@/src/context/usePriceData";
import { useTranslations } from "next-intl";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];
const AppliancesPieChart = () => {
  const context = useContext(UsedApplianceContext);
  const PriceContext = useContext(LivePriceContext);
  const t = useTranslations("Dashboard.applianceBreakdown");
  const currentPrice = PriceContext?.PriceData?.currentPrice;
  const AppliancesData = context?.Appliances?.slice(0, 5);
  const totalUsage = context?.totalKwh;
  const totalAmount = context?.totalAmount;
  const chartData =
    AppliancesData?.map((item, index) => ({
      ...item,
      color: COLORS[index % COLORS.length],
      percentage: totalUsage ? ((item.kwh / totalUsage) * 100).toFixed(1) : "0",
    })) ?? [];
  return (
    <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl flex flex-col overflow-hidden">
      <CardHeader className="pb-2 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold text-slate-900 dark:text-stone-100 flex items-center gap-2">
            {t("title")} (5)
          </CardTitle>
          <Info className="h-4.5 w-4.5 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-stone-300 transition-colors" />
        </div>
        <CardDescription className="text-xs text-slate-500 dark:text-stone-400 leading-relaxed font-normal">
          {t("subtitle")}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2 flex-1 flex flex-col">
        {/* Donut Chart visual container */}
        <div className="w-full h-48 flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height={192}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={76}
                paddingAngle={3}
                dataKey="kwh"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="stroke-white dark:stroke-[#0c0a09] stroke-[2px]"
                  />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 99999 }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute z-10 flex flex-col items-center justify-center select-none pointer-events-none">
            <span className="text-[10px] font-bold text-slate-400 dark:text-stone-500 uppercase tracking-widest">
              {t("total")}
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-stone-100 mt-0.5">
              {totalUsage ?? "N/A"}
            </span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-stone-400">
              kWh
            </span>
          </div>
        </div>

        {/* Detailed Appliance breakdown Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse select-text">
            <thead>
              <tr className="border-b border-slate-100 dark:border-stone-850 text-[10px] uppercase tracking-wider text-slate-400 dark:text-stone-500 font-bold">
                <th className="py-2.5 font-bold xl:border-r xl:border-slate-100 dark:xl:border-stone-800">
                  {t("applianceName")}
                </th>
                <th className="py-2.5 text-center font-bold xl:border-r xl:border-slate-100 dark:xl:border-stone-800">
                  {t("energyUsage")} <br className="hidden lg:block" />{" "}
                  <span>(kwh)</span>
                </th>
                <th className="py-2.5 text-center font-bold xl:border-r xl:border-slate-100 dark:xl:border-stone-800">
                  {t("cost")} <br className="hidden lg:block" />{" "}
                  <span>(€)</span>
                </th>
                <th className="py-2.5 text-right font-bold">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-stone-850 text-xs font-semibold">
              {chartData.map((item,index) => (
                <tr key={item.appliance.name + index}>
                  <td className="py-3 flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />

                    <span>
                      {
                        Availableappliances.find(
                          (e) => e.dbName === item.appliance.name,
                        )?.name
                      }
                    </span>
                  </td>

                  <td className="py-3 px-6 text-right ">
                    {item.kwh.toFixed(2)}
                  </td>

                  <td className="py-3 px-2 text-right">
                    {item.totalPrice.toFixed(2)}
                  </td>

                  <td className="py-3 text-right text-emerald-600 font-bold">
                    {item.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Banner container */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-stone-900/30 border border-slate-100 dark:border-stone-850/80 space-y-2 select-none shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-stone-400 font-semibold">
              {t("totalConsumptionToday")}
            </span>
            <span className="font-extrabold text-slate-900 dark:text-stone-100 font-mono">
              {totalUsage?.toFixed(2) ?? "N/A"} kWh
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-stone-400 font-semibold">
              {t("totalCostToday")}
            </span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-500 font-mono">
              {totalAmount?.toFixed(2) ?? "N/A"} €
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] pt-2 mt-1.5 border-t border-slate-200 dark:border-stone-800 text-slate-400 dark:text-stone-500 font-bold uppercase tracking-wider">
            <span>{t("currentPrice")}</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {currentPrice} kWh
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppliancesPieChart;
