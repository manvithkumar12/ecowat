import { KpiCard, MonthlyDataPoint } from "../../types";

export const carbonFootprintData = (
  weeklyValue: string,
  monthlyValue: string,
) => [
  {
    title: "Weekly Emissions",
    value: `${weeklyValue} kg CO₂`,
    icon: "BarChart2",
  },
  {
    title: "Monthly Emissions",
    value: `${monthlyValue} kg CO₂`,
    icon: "TrendingUp",
  },
];

export const monthlyEmissionsData: MonthlyDataPoint[] = [
  { date: "1", emission: 8 },
  { date: "2", emission: 9 },
  { date: "3", emission: 10 },
  { date: "4", emission: 10 },
  { date: "5", emission: 10 },
  { date: "6", emission: 8 },
  { date: "7", emission: 9 },
  { date: "8", emission: 10 },
  { date: "9", emission: 10 },
  { date: "10", emission: 10 },
  { date: "11", emission: 8 },
  { date: "12", emission: 9 },
  { date: "13", emission: 10 },
  { date: "14", emission: 11 },
  { date: "15", emission: 10 },
  { date: "16", emission: 8 },
  { date: "17", emission: 10 },
  { date: "18", emission: 9 },
  { date: "19", emission: 10 },
  { date: "20", emission: 10 },
  { date: "21", emission: 8 },
  { date: "22", emission: 9 },
  { date: "23", emission: 11 },
  { date: "24", emission: 10 },
  { date: "25", emission: 11 },
  { date: "26", emission: 8 },
  { date: "27", emission: 10 },
  { date: "28", emission: 9 },
  { date: "29", emission: 10 },
  { date: "30", emission: 10 },
];

export const co2Substats = [
  {
    label: "Total Weekly",
    value: "68 kg",
    color: "text-emerald-600 dark:text-emerald-500",
    highlight: true,
    fontMono: true,
  },
  {
    label: "Highest Emission",
    value: "Saturday",
    color: "text-slate-800 dark:text-stone-200",
    highlight: false,
    fontMono: false,
  },
  {
    label: "Lowest Emission",
    value: "Monday",
    color: "text-slate-800 dark:text-stone-200",
    highlight: false,
    fontMono: false,
  },
  {
    label: "Daily Average",
    value: "9.7 kg",
    color: "text-slate-800 dark:text-stone-200",
    highlight: false,
    fontMono: true,
  },
];
