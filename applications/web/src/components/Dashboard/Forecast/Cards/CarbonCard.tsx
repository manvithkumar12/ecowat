"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import MlToolTip from "@/src/components/generalComponents/MlToolTip";
import { Leaf } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslations } from "next-intl";
import { usePredictionCarbon } from "@/src/context/usePredictionCarbon";
import { forecastData } from "@/src/utils/forecastData/forecastData";
import { getCarbonStats } from "@/src/utils/forecastData/carbonData";
import LoadingChart from "../States/loading";
import ErrorChart from "../States/Error";
import EmptyChart from "../States/Empty";

const CarbonCard = () => {
  const t = useTranslations("Forecast.carbon");
  const { data, isLoading, isError, refetch } = usePredictionCarbon();
  const tDays = useTranslations("Footprint.weekly.days");

  if (isLoading) {
    return (
      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden">
        <LoadingChart />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden">
        <ErrorChart onRetry={refetch} />
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden">
        <EmptyChart onRetry={refetch} />
      </Card>
    );
  }

  const refined_data = forecastData(data, tDays);
  const forecast_data = refined_data.forecastData;
  const carbonStats = getCarbonStats(refined_data, t);

  return (
    <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden flex flex-col justify-between">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-stone-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-bold text-slate-900 dark:text-stone-100 flex items-center gap-2">
              <Leaf className="h-4.5 w-4.5 text-emerald-500" />
              {t("title")}
              <MlToolTip />
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-stone-400 font-normal">
              {t("description")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-5 flex-1 flex flex-col justify-between">
        <div className="w-full h-52 min-h-52">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={forecast_data}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="co2Grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(120, 120, 120, 0.08)"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "rgba(140, 140, 140, 0.8)",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />
              <YAxis
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "rgba(140, 140, 140, 0.8)",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />
              <Tooltip
                content={({ active, payload, label }: any) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-[#0c0a09] border border-slate-200 dark:border-stone-800 p-2.5 rounded-xl shadow-xl text-xs z-50">
                        <p className="font-bold text-slate-900 dark:text-stone-100">
                          {label}
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-500 font-extrabold mt-1">
                          {payload[0].value} kg CO₂
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="co2"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#co2Grad2)"
                dot={{
                  r: 3.5,
                  stroke: "#10b981",
                  strokeWidth: 1,
                  fill: "#ffffff",
                }}
                activeDot={{ r: 5.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 mt-2 border-t border-slate-100 dark:border-stone-900/50 text-xs font-semibold">
          {carbonStats?.map((stat, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl border text-center ${stat.highlight ? "border-emerald-500/15 bg-emerald-50/5" : "border-slate-100 dark:border-stone-900 bg-slate-50 dark:bg-stone-900/10"}`}
            >
              <span
                className={`text-[9px] ${stat.highlight ? "text-emerald-600 dark:text-emerald-500" : "text-slate-400 dark:text-stone-500"} uppercase tracking-widest font-bold block`}
              >
                {stat.label}
              </span>
              <span
                className={`text-sm ${stat.highlight ? "font-black" : "font-extrabold"} ${stat.color} mt-1 block ${stat.fontMono ? "font-mono" : ""}`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonCard;
