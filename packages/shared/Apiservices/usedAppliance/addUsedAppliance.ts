import { apiClient } from "../apiclient";

export interface AddUsedApplianceInput {
  applianceName: string;
  rating: number;
  usageHours: number;
  kwh: number;
  totalPrice: number;
  date: string;
  startHour?: string;
  endHour?: string;
  scheduleId?: number;
}

export const addUsedApplianceApi = async (
  data: AddUsedApplianceInput,
  baseUrl?: string,
) => {
  const baseurl = baseUrl ?? "";
  return apiClient.post(`${baseurl}/api/used-appliance/add`, data);
};
