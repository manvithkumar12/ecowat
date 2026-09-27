"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { useWeeklyPriceContext } from "@/src/context/useWeeklyUserPrice";
import { Coins } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyChart from "../States/Empty";
import ErrorChart from "../States/Error";
import LoadingChart from "../States/loading";
import { priceSubstats } from "@/src/utils/priceData/userPriceWeekly";
import MlToolTip from "@/src/components/generalComponents/MlToolTip";
import { useLocale, useTranslations } from "next-intl";

const ElectricityCard = () => {
  const { priceForecastData, isError, isLoading, refetch } =
    useWeeklyPriceContext();
  const locale = useLocale();
  const language = locale === "en" ? "en-DE" : "de-DE";

  const t = useTranslations("Forecast.electricity");

  const chartData = () => {
    if (!Array.isArray(priceForecastData)) return [];
    return [...priceForecastData]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((priceItem) => {
        const dayName = new Date(priceItem.date).toLocaleDateString(language, {
          weekday: "short",
          timeZone: "Europe/Berlin",
        });
        return {
          name: dayName,
          price: priceItem.predictedPrice ?? (priceItem as any).price,
        };
      });
  };

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

  const data = chartData();

  if (data.length === 0) {
    return (
      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden">
        <EmptyChart onRetry={refetch} />
      </Card>
    );
  }

  const stats = priceSubstats(data, t);

  return (
    <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm rounded-2xl overflow-hidden flex flex-col justify-between">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-stone-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-bold text-slate-900 dark:text-stone-100 flex items-center gap-2">
              <Coins className="h-4.5 w-4.5 text-emerald-500" />
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
        {/* Price Chart Container */}
        <div className="w-full h-52 min-h-52">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="costGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.01} />
                </linearGradient>
              </defs>
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
                domain={[0, "auto"]}
                tickFormatter={(value) => `€${value.toFixed(3)}`}
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
                        <p className="text-sky-600 dark:text-sky-500 font-extrabold mt-1">
                          €{payload[0].value.toFixed(4)}/kWh
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#0ea5e9"
                strokeWidth={2.5}
                fill="url(#costGrad2)"
                dot={{
                  r: 3.5,
                  stroke: "#0ea5e9",
                  strokeWidth: 1,
                  fill: "#ffffff",
                }}
                activeDot={{ r: 5.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 mt-2 border-t border-slate-100 dark:border-stone-900/50 text-xs font-semibold">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl border text-center ${stat.highlight ? "border-emerald-500/15 bg-emerald-500/5" : "border-slate-100 dark:border-stone-900 bg-slate-50 dark:bg-stone-900/10"}`}
            >
              <span
                className={`text-[9px] ${stat.highlight ? "text-emerald-600 dark:text-emerald-500" : "text-slate-400 dark:text-stone-500"} uppercase tracking-widest font-bold block`}
              >
                {stat.label}
              </span>
              <span
                className={`text-sm font-extrabold ${stat.color} mt-1 block font-mono`}
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

export default ElectricityCard;
