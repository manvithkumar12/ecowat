"use client";

import { TooltipContent, TooltipTrigger, Tooltip } from "@/shadcn/ui/tooltip";
import MlToolTip from "@/src/components/generalComponents/MlToolTip";
import {
  today,
  dummyPredictions,
  offsets,
} from "@/src/utils/forecastData/placeholderData";
import { Info } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as TooltipIcon,
} from "recharts";

const DummyChart = () => {
  const t = useTranslations("Dashboard.consumptionForecast");
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
  return (
    <div className="xl:col-span-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col h-100">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            {t("title")}
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-slate-400 cursor-pointer inline-block" />
              </TooltipTrigger>
              <TooltipContent>{t("estimatedTooltip")}</TooltipContent>
            </Tooltip>
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
        <p className="text-xs text-red-400 dark:text-slate-400 mt-0.5">
          {t("estimatedNotice")}
        </p>
      </div>
      <div className="flex-1 w-full min-h-0 text-xs">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={dummyConsumptionData}
            margin={{ top: 10, right: 10, left: -5, bottom: 0 }}
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
              domain={[0, 12]}
              ticks={[0, 3, 6, 9, 12]}
              width={50}
              tickFormatter={(value) => `${value} kWh`}
            />
            <TooltipIcon
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "12px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "var(--foreground)" }}
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

export default DummyChart;
