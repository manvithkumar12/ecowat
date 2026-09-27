"use client";
import { CustomTooltip } from "@/shadcn/ui/CustomTooltip";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
} from "recharts";
import MlToolTip from "../../generalComponents/MlToolTip";
import { useTranslations } from "next-intl";
import { usePredictionCarbon } from "@/src/context/usePredictionCarbon";
import {
  CarbonReductionError,
  CarbonReductionSkeleton,
} from "./FootPrintStates";
import { forecastData } from "@/src/utils/forecastData/forecastData";

const CarbonReduction = () => {
  const t = useTranslations("Footprint.reduction");
  const tDays = useTranslations("Footprint.weekly.days");
  const { data, isLoading, isError, error, refetch } = usePredictionCarbon();
  let forecast_data;
  let totalProjected;
  if (data) {
    const refined_data = forecastData(data, tDays);
    totalProjected = refined_data.totalProjected;
    forecast_data = refined_data.forecastData;
  }
  if (isLoading) return <CarbonReductionSkeleton />;
  if (isError || error) return <CarbonReductionError refetch={refetch} />;
  if (!data) return <CarbonReductionSkeleton />;
  return (
    <section>
      <span className="flex gap-2">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-4">
          {t("title")}
        </h2>
        <MlToolTip />
      </span>
      <p className="text-sm text-slate-600 dark:text-stone-400 mb-4">
        {t("subtitle")}
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={forecast_data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis unit="kg" stroke="#9ca3af" />
          <RechartTooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            content={<CustomTooltip />}
          />
          <Line
            type="monotone"
            dataKey="emission"
            stroke="#34D399"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-4 text-sm text-slate-600 dark:text-stone-400">
        <span className="font-semibold">{t("projectedWeekly")}</span>{" "}
        {totalProjected} kg CO₂
      </p>
    </section>
  );
};

export default CarbonReduction;
