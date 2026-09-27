import { ForecastDataOutput } from "./forecastData";

export interface CarbonSubstatItem {
  label: string;
  value: string;
  color: string;
  highlight: boolean;
  fontMono?: boolean;
}

export const getCarbonStats = (
  data: ForecastDataOutput,
  t: (key: string) => string,
): CarbonSubstatItem[] => {
  const forecast = data.forecastData ?? [];

  if (forecast.length === 0) {
    return [];
  }

  const Total_Weekly = forecast.reduce((acc, curr) => acc + curr.co2, 0);

  const max = Math.max(...forecast.map((item) => item.co2));
  const min = Math.min(...forecast.map((item) => item.co2));

  const dayWithMaxCO2 = forecast
    .filter((item) => item.co2 === max)
    .map((item) => item.day)
    .join(", ");

  const dayWithMinCO2 = forecast
    .filter((item) => item.co2 === min)
    .map((item) => item.day)
    .join(", ");

  const dailyAvg = (Total_Weekly / forecast.length).toFixed(1);

  return [
    {
      label: t("TotalWeekly"),
      value: `${data.totalProjected || Total_Weekly.toFixed(1)} kg`,
      color: "text-emerald-600 dark:text-emerald-500",
      highlight: true,
      fontMono: true,
    },
    {
      label: t("HighestEmission"),
      value: dayWithMaxCO2,
      color: "text-slate-800 dark:text-stone-200",
      highlight: false,
      fontMono: false,
    },
    {
      label: t("LowestEmission"),
      value: dayWithMinCO2,
      color: "text-slate-800 dark:text-stone-200",
      highlight: false,
      fontMono: false,
    },
    {
      label: t("AverageEmission"),
      value: `${dailyAvg} kg`,
      color: "text-slate-800 dark:text-stone-200",
      highlight: false,
      fontMono: true,
    },
  ];
};

