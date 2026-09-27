export const statusFillMap = {
  Low: 35,
  Moderate: 58,
  High: 78,
  Excellent: 92,
} as const;

export const statusColorMap = {
  Low: "text-rose-500",
  Moderate: "text-amber-500",
  High: "text-emerald-500",
  Excellent: "text-cyan-500",
} as const;

export const statusLabelMap = {
  Low: "Grid rely heavily on fossil fuels",
  Moderate: "Moderate green energy availability",
  High: "High green energy supply",
  Excellent: "Perfect day to run power-heavy appliances",
} as const;

export const statusToneMap = {
  Low: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Moderate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  High: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Excellent: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
} as const;

export const statusGlowMap = {
  Low: "shadow-rose-500/5 dark:shadow-rose-500/10",
  Moderate: "shadow-amber-500/5 dark:shadow-amber-500/10",
  High: "shadow-emerald-500/5 dark:shadow-emerald-500/10",
  Excellent: "shadow-cyan-500/5 dark:shadow-cyan-500/10",
} as const;
