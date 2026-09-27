import { apiClient } from "../apiclient";

export type ResType = {
  data: UsedAppliance[];
  yesterdayUsage: number;
  past30DaysCost: number;
  past30DaysSavings: number;
};

export type UsedAppliance = {
  id?: number;
  appliance: {
    name: string;
  };
  usageHours: number;
  kwh: number;
  totalPrice: number;
  rating: number;
  date?: string | Date;
};

export const usedApplianceApi = async (
  baseUrl?: string,
  date?: string,
): Promise<ResType> => {
  const url = baseUrl ?? "";
  const query = date ? `?date=${date}` : "";
  return apiClient.get(`${url}/api/used-appliance/get${query}`);
};
