"use client";
import { CustomTooltip } from "@/shadcn/ui/CustomTooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { useCarbonEmissionContext } from "@/src/context/useCarbonEmissions";
import { MonthlyEstError, MonthlyEstSkeleton } from "./FootPrintStates";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslations } from "next-intl";

const MonthlyEst = () => {
  const t = useTranslations("Footprint.monthly");
  const { data, isLoading, isError, refetch } = useCarbonEmissionContext();

  if (isLoading) return <MonthlyEstSkeleton />;
  if (isError) return <MonthlyEstError refetch={refetch} />;
  if (!data) return <MonthlyEstSkeleton />;
  const totalMonthlyEmissions = data?.monthlyData?.reduce(
    (sum, item) => sum + item.carbonEmission,
    0,
  );
  const averageDailyEmissions =
    totalMonthlyEmissions / data?.monthlyData?.length;
  const projectedMonthlyEmissions = Math.round(totalMonthlyEmissions * 1.09);
  const useWarn = data.monthlyData.length > 28 ? false : true;

  return (
    <section>
      <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm dark:border-stone-800 dark:bg-[#0c0a09]">
        <CardHeader className="border-b border-slate-100 pb-5 dark:border-stone-900/50">
          <CardTitle className="text-xl font-semibold text-slate-900 dark:text-stone-100">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-sm text-slate-600 dark:text-stone-400">
            {t("subtitle")}
          </CardDescription>
          {useWarn && (
            <p className="text-sm text-yellow-600 dark:text-stone-400">
              {t("warning")}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data?.monthlyData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                  interval={4}
                />
                <YAxis
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <RechartTooltip
                  cursor={{ fill: "rgba(16, 185, 129, 0.08)" }}
                  content={<CustomTooltip />}
                />
                <Bar
                  dataKey="carbonEmission"
                  fill="#10B981"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-stone-800 dark:bg-stone-950/40">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-stone-400">
                {t("totalMonthly")}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-stone-100">
                {totalMonthlyEmissions} kg CO₂
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-stone-800 dark:bg-stone-950/40">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-stone-400">
                {t("averageDaily")}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-stone-100">
                {averageDailyEmissions.toFixed(1) ?? 0} kg CO₂
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-stone-800 dark:bg-stone-950/40">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-stone-400">
                {t("projectedMonthly")}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-stone-100">
                {projectedMonthlyEmissions} kg CO₂
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default MonthlyEst;
