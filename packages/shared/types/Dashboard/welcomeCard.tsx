export type TodaysConsumptionApplication = {
  applianceName: string;
  Rating: number;
  usage: number;
  consumption: number;
};
export type TodaysUsageContextType = {
  consumption: number;
  baselineValue: number;
  differenceValue: number;
  percentageDifference: number;
  comparedValue: "more" | "less" | "equal";
  unit: "kWh";
  recentApplications: TodaysConsumptionApplication[];
};
