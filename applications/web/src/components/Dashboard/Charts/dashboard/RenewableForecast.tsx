"use client";

import { useRenewableData } from "@ecowat/shared";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUser } from "@/src/context/userContext";
import { useRenewableDataContext } from "@/src/context/useRenewableData";
import { useLocale, useTranslations } from "next-intl";

const RenewableForecast = () => {
  const user = useUser();
  const { renewableData, isLoading, refetch, isError } =
    useRenewableDataContext();
  const t = useTranslations("Dashboard.renewableForecast");
  const locale = useLocale();
  const language = locale === "de" ? "de-DE" : "en-US";
  const renewableDataForecast = Array.isArray(renewableData?.data)
    ? renewableData.data.map((e) => ({
        day: new Date(e.date).toLocaleDateString(language, {
          weekday: "short",
        }),
        Solar: e.solar,
        Wind: e.wind,
        Total: e.solar + e.wind,
      }))
    : [];

  if (isLoading) {
    return (
      <div className="xl:col-span-3 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm flex items-center justify-center h-100">
        <p className="text-sm text-slate-500">{t("loading")}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="xl:col-span-3 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm flex items-center justify-center h-100">
        <div className="text-center">
          <p className="text-sm font-medium text-red-500">{t("failed")}</p>
          <p className="text-xs text-slate-500 mt-1">{t("tryAgain")}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 bg-red-500 p-2 px-4 rounded-md text-white cursor-pointer hover:bg-red-600 transition-colors duration-200 active:"
          >
            {t("retry")}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="xl:col-span-3 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col h-100">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {t("title")}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-[#f59e0b]" />
            {t("solar")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-[#06b6d4]" />
            {t("wind")}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 text-xs">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={renewableDataForecast}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="solarColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="windColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              unit="%"
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
              dataKey="Solar"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#solarColor)"
            />
            <Area
              type="monotone"
              dataKey="Wind"
              stroke="#06b6d4"
              fillOpacity={1}
              fill="url(#windColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RenewableForecast;
