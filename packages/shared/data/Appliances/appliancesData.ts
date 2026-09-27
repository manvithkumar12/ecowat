export type ApplianceCategory = string;

export interface Appliance {
  id: number;
  name: string;
  category: ApplianceCategory;
  powerRatingW: number;
  dailyUsageHours: number;
  DBName: string;
  status: true | false;
}
