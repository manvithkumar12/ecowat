export interface SummaryCard {
  title: string;
  value: string;
  icon: string;
}

export interface ApplianceRecommendation {
  name: string;
  bestTime: string;
  reason: string;
  savings: string;
  priority: "High" | "Medium" | "Low";
  status: "recommend" | "avoid";
}
