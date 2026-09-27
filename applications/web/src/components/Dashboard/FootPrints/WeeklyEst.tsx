"use client";
import { CustomTooltip } from "@/shadcn/ui/CustomTooltip";
import { useCarbonEmissionContext } from "@/src/context/useCarbonEmissions";
import { WeeklyEstError, WeeklyEstSkeleton } from "./FootPrintStates";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
} from "recharts";
import { useTranslations } from "next-intl";

const DAY_ABBR: ("Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat")[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const WeeklyEst = () => {
  const t = useTranslations("Footprint.weekly");
  const { data, isLoading, isError, refetch } = useCarbonEmissionContext();

  if (isLoading) return <WeeklyEstSkeleton />;
  if (isError) return <WeeklyEstError refetch={refetch} />;
  if (!data) return <WeeklyEstSkeleton />;
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().slice(0, 10);
    const dayKey = DAY_ABBR[d.getDay()];
    const dayLabel = t(`days.${dayKey}`);
    const match = data.weeklyData.find((w) => w.date === dateStr);
    return { day: dayLabel, carbonEmission: match?.carbonEmission ?? 0 };
  });

  const emissions = chartData.map((d) => d.carbonEmission);
  const avgWeekly = (
    emissions.reduce((s, v) => s + v, 0) / emissions.length
  ).toFixed(1);
  const maxVal = Math.max(...emissions);
  const minVal = Math.min(...emissions);
  const highestDay =
    chartData.find((d) => d.carbonEmission === maxVal)?.day ?? "—";
  const lowestDay =
    chartData.find((d) => d.carbonEmission === minVal)?.day ?? "—";
  const highestWeekly = maxVal.toFixed(1);
  const lowestWeekly = minVal.toFixed(1);
  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-4">
        {t("title")}
      </h2>
      <p className="text-sm text-slate-600 dark:text-stone-400 mb-4">
        {t("subtitle")}
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorEmission" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34D399" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis unit="kg" stroke="#9ca3af" />
          <RechartTooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            content={<CustomTooltip />}
          />
          <Area
            type="monotone"
            dataKey="carbonEmission"
            stroke="#34D399"
            fillOpacity={1}
            fill="url(#colorEmission)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-slate-600 dark:text-stone-400">
        <p>
          <span className="font-semibold">{t("highestDay")}</span>{" "}
          {highestDay} ({highestWeekly} kg)
        </p>
        <p>
          <span className="font-semibold">{t("lowestDay")}</span>{" "}
          {lowestDay} ({lowestWeekly} kg)
        </p>
        <p>
          <span className="font-semibold">{t("averageDaily")}</span>{" "}
          {avgWeekly} kg
        </p>
      </div>
    </section>
  );
};

export default WeeklyEst;
