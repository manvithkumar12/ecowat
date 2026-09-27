export interface WeatherDay {
  tempMin: number;
  tempMax: number;
  renewabilityScore: number;
  dayOfWeek: number;
}

export interface ApplianceUsage {
  evchargerHours: number;
  washingmachineHours: number;
  dishwasherHours: number;
  tumbledryerHours: number;
  electricwaterheaterHours: number;
  heatpumpHours: number;
  airconditionerHours: number;
  homebatterystorageHours: number;
  electricfloorheatingHours: number;
  chestfreezerHours: number;
  poolpumpHours: number;
  electricovenHours: number;
  clothesironHours: number;
  dehumidifierHours: number;
  airpurifierHours: number;
  saunaheaterHours: number;
  spaceheaterHours: number;
  electricboilerHours: number;
  waterpumpHours: number;
}

export interface PredictUsageInput {
  householdSize: number;
  yesterdayUsage: number;
  avgLast7Days: number;
  month: number;
  appliances: ApplianceUsage;
  weather: WeatherDay[];
}

export interface PredictedUsage {
  date: string;
  predictedUsage: number;
}
export interface ConsumptionForecast {
  predictedUsage: PredictedUsage[];
  noData?: boolean;
}
