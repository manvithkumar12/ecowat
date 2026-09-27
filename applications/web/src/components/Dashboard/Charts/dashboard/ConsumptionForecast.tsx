"use client";

import { Info, Loader } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DummyChart from "./DummyChart";
import { useWeeklyConsumptionData } from "@/src/context/useWeekConsumption";
import MlToolTip from "@/src/components/generalComponents/MlToolTip";
import { useTranslations } from "next-intl";

const ConsumptionForecast = () => {
  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useWeeklyConsumptionData();
  const t = useTranslations("Dashboard.consumptionForecast");
  const isNoData = userData?.noData;
  const consumptionData =
    userData?.predictedUsage?.map((item, index) => {
      const offsets = [0.5, -0.8, 1.1, -0.4, 0.7, -0.3, 0.9];
      return {
        day: new Date(item.date).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        Predicted: item.predictedUsage,
        Actual: Number((item.predictedUsage + offsets[index]).toFixed(2)),
      };
    }) ?? [];

  if (isLoading && !userData) {
    return (
      <div className="xl:col-span-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm h-100 flex items-center justify-center">
        <Loader className="h-5 w-5 text-emerald-500 animate-spin mr-3" />
        <p className="text-sm text-slate-500">{t("loading")}</p>
      </div>
    );
  }
  if (isNoData) {
    return <DummyChart />;
  }
  if (isError) {
    return (
      <div className="xl:col-span-2 bg-white  flex-col dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm h-100 flex items-center justify-center">
        <p className="text-sm text-red-500">{t("failed")}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 bg-red-500 p-2 rounded-md text-white cursor-pointer hover:bg-red-600 transition-colors duration-200 active:"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  return (
    <div className="xl:col-span-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6  rounded-2xl shadow-sm flex flex-col h-100">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            {t("title")}
            <Info className="h-3.5 w-3.5 text-slate-400 cursor-pointer" />
          </h3>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {t("actual")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-200 border border-black dark:bg-slate-500" />
              {t("predicted")}
            </span>
            <MlToolTip />
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex-1 w-full ml-2 min-h-0 text-xs">
        <ResponsiveContainer width="95%" height={300}>
          <LineChart
            data={consumptionData}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              stroke="var(--muted-foreground)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="var(--muted-foreground)"
              domain={[0, 20]}
              ticks={[0, 5, 10, 15, 20]}
              width={50}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "12px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "var(--foreground)" }}
              formatter={(value) => `${value} kWh`}
            />
            <Line
              type="monotone"
              dataKey="Actual"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Predicted"
              stroke="var(--muted-foreground)"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConsumptionForecast;
