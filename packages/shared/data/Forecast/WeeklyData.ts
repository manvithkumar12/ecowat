export type EnergySubset = {
  HighestDay: string;
  highestValue: string;
  LowestDay: string;
  lowestValue: string;
  DailyAverage: number;
};

export const energySubstats = (
  data: EnergySubset,
  t: (key: string) => string,
) => [
  {
    label: `${t("HighestPredicted")}`,
    value: data.HighestDay + " (" + data.highestValue + ")",
    color: "text-slate-800 dark:text-stone-200",
  },
  {
    label: `${t("LowestPredicted")}`,
    value: data.LowestDay + " (" + data.lowestValue + ")",
    color: "text-slate-800 dark:text-stone-200",
  },
  {
    label: `${t("DailyAverage")}`,
    value: data.DailyAverage.toFixed(2) + " kWh",
    color: "text-emerald-600 dark:text-emerald-500",
  },
];
