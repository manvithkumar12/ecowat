"use client";

import { useWeeklyPricePred } from "@ecowat/shared";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WeekPriceLoadingState } from "../states/loading";
import { WeekPriceError } from "../states/Error";
import { PriceEmptyState } from "../states/Empty";
import { useWeeklyPriceContext } from "@/src/context/useWeeklyUserPrice";
import MlToolTip from "@/src/components/generalComponents/MlToolTip";
import { useTranslations } from "next-intl";

const ElectricityForecast = () => {
  const { priceForecastData, isError, isLoading, refetch } =
    useWeeklyPriceContext();
  console.log(priceForecastData);
  const t = useTranslations("Dashboard.priceForecast");
  const chartData = Array.isArray(priceForecastData) ? priceForecastData : [];

  if (isLoading) return <WeekPriceLoadingState />;
  if (isError) return <WeekPriceError onRetry={() => refetch()} />;
  if (chartData.length === 0) return <PriceEmptyState />;

  return (
    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col h-100">
      <div className="mb-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {t("title")}
        </h3>
        <span className="w-full flex gap-2 items-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t("subtitle")}
          </p>
          <MlToolTip mlauto />
        </span>
      </div>

      <div className="flex-1 w-full min-h-0 text-xs">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="priceColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="var(--muted-foreground)"
              tickFormatter={(value) => `.${value.toFixed(2).split(".")[1]}€`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "12px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "var(--foreground)" }}
            />
            <Area
              type="monotone"
              dataKey="predictedPrice"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#priceColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ElectricityForecast;
