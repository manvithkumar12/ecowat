"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import MlToolTip from "@/src/components/generalComponents/MlToolTip";
import { FindForecastValues } from "@/src/utils/forecastData/FindForecastValues";
import {
  today,
  dummyPredictions,
  offsets,
} from "@/src/utils/forecastData/placeholderData";
import { energySubstats } from "@ecowat/shared";
import { Activity, Info, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as ChartToolTip,
} from "recharts";

const DummyChart = () => {
  const t = useTranslations("Forecast.days7");
  const locale = useLocale();
  const language = locale === "en" ? "en-DE" : "de-DE";

  const days = Array.from({ length: 7 }, (_, index) =>
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + index,
    ).toLocaleDateString(language, {
      weekday: "short",
    }),
  );

  const dummyConsumptionData = days.map((day, index) => ({
    day,
    Predicted: dummyPredictions[index],
    Actual: Number((dummyPredictions[index] + offsets[index]).toFixed(2)),
  }));

  const formattedDummyData = dummyConsumptionData.map((item) => ({
    name: item.day,
    predicted: item.Predicted,
    actual: item.Actual,
  }));

  const valuesData = FindForecastValues(dummyConsumptionData || []);
  return (
    <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-stone-900/50 pb-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex gap-2 items-center">
              <CardTitle className="text-base font-bold text-slate-900 dark:text-stone-100 flex items-center gap-2">
                <Activity className="h-4.5 w-4.5 text-emerald-500" />
                {t("title")}
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-slate-400 cursor-pointer inline-block" />
                </TooltipTrigger>
                <TooltipContent>{t("estimatedTooltip")}</TooltipContent>
              </Tooltip>
              <MlToolTip />
            </div>
            <p className="text-xs text-red-600 dark:text-red-200 font-normal">
              {t("estimatedNotice")}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold shrink-0">
            {energySubstats(valuesData, t).map((stat, index) => (
              <div
                key={index}
                className="px-3.5 py-1.5 rounded-lg bg-slate-50 dark:bg-stone-900/25 border border-slate-100 dark:border-stone-900"
              >
                <span className="text-[9px] text-slate-400 dark:text-stone-500 block uppercase tracking-wider font-bold">
                  {stat.label}
                </span>
                <span
                  className={`text-sm font-extrabold ${stat.color} font-mono`}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="w-full h-80 min-h-80">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={formattedDummyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(120, 120, 120, 0.08)"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "rgba(140, 140, 140, 0.8)",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />
              <YAxis
                domain={[0, 12]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "rgba(140, 140, 140, 0.8)",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />
              <ChartToolTip
                content={(props) => {
                  const { active, payload, label } = props;
                  if (active && payload && payload.length) {
                    const actual = payload.find((p) => p.dataKey === "actual");
                    const predicted = payload.find(
                      (p) => p.dataKey === "predicted",
                    );
                    return (
                      <div className="bg-white dark:bg-[#0c0a09] border border-slate-200 dark:border-stone-800 p-3 rounded-xl shadow-xl text-xs space-y-1.5 z-50">
                        <p className="font-bold text-slate-900 dark:text-stone-100">
                          {label}
                        </p>
                        <div className="space-y-1 text-slate-500 dark:text-stone-400 font-medium pt-1 border-t border-slate-100 dark:border-stone-900">
                          {actual && actual.value !== null && (
                            <p className="flex justify-between gap-6">
                              {t("actualUsage")}:{" "}
                              <span className="text-slate-800 dark:text-stone-200 font-semibold">
                                {actual.value} kWh
                              </span>
                            </p>
                          )}
                          <p className="flex justify-between gap-6">
                            {t("predicted")}:{" "}
                            <span className="text-emerald-600 dark:text-emerald-500 font-bold">
                              {predicted?.value} kWh
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#10b981"
                strokeWidth={3.5}
                dot={{
                  r: 4.5,
                  stroke: "#10b981",
                  strokeWidth: 1.5,
                  fill: "#ffffff",
                }}
                activeDot={{ r: 6.5 }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#64748b"
                strokeWidth={2.5}
                dot={{
                  r: 4.5,
                  stroke: "#64748b",
                  strokeWidth: 1.5,
                  fill: "#ffffff",
                }}
                activeDot={{ r: 6.5 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center gap-6 justify-center text-xs font-semibold mt-4 border-t border-slate-100 dark:border-stone-900/50 pt-3">
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-stone-400">
            <span className="h-3 w-3 rounded-full bg-slate-500 shrink-0" />{" "}
            {t("actualConsumption")}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500">
            <span className="h-3 w-3 rounded-full bg-emerald-500 shrink-0" />{" "}
            {t("predictedConsumption")}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-normal ml-auto shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500/10 mr-1" />
            {t("confidence")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DummyChart;
