export interface KpiCard {
  title: string;
  value: string;
  icon: string;
}


export interface WeeklyDataPoint {
  day: string;
  emission: number;
}

export interface MonthlyDataPoint {
  date: string;
  emission: number;
}

export interface ReductionCard {
  label: string;
  amount: string;
}

export interface ProgressItem {
  label: string;
  value: number; // 0-100
}
