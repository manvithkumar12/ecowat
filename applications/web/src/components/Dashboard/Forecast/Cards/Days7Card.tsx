"use client";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { useWeeklyConsumptionData } from "@/src/context/useWeekConsumption";
import { energySubstats } from "@ecowat/shared";
import { Activity, Sparkles } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Forecastloading from "../States/loading";
import ForecastError from "../States/Error";
import ForecastDummy from "../States/Dummy";
import { FindActualValues } from "@/src/utils/forecastData/FindForecastValues";
import MlToolTip from "@/src/components/generalComponents/MlToolTip";
import { useLocale, useTranslations } from "next-intl";

const Days7Card = () => {
  const locale = useLocale();
  const language = locale === "en" ? "en-DE" : "de-DE";
  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useWeeklyConsumptionData();
  const t = useTranslations("Forecast.days7");

  const isNoData =
    !userData ||
    userData.noData ||
    !userData.predictedUsage ||
    userData.predictedUsage.length === 0;

  if (isLoading) {
    return (
      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden">
        <Forecastloading />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden">
        <ForecastError onRetry={refetch} />
      </Card>
    );
  }

  if (isNoData) {
    return (
      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden">
        <ForecastDummy />
      </Card>
    );
  }

  const chartData = useMemo(() => {
    if (!userData?.predictedUsage) return [];
    return userData.predictedUsage.map((item) => {
      const dayName = new Date(item.date).toLocaleDateString(language, {
        weekday: "short",
        timeZone: "Europe/Berlin",
      });
      return {
        name: dayName,
        predicted: item.predictedUsage,
        actual: null,
      };
    });
  }, [userData]);

  const valuesData = FindActualValues(userData!, language);

  return (
    <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-slate-100 dark:border-stone-900/50 pb-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-bold text-slate-900 dark:text-stone-100 flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-emerald-500" />
              {t("title")}
              <MlToolTip />
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-stone-400 font-normal">
              {t("description")}
            </CardDescription>
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
              data={chartData}
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
                domain={[15, 30]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "rgba(140, 140, 140, 0.8)",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />
              <Tooltip
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

export default Days7Card;
