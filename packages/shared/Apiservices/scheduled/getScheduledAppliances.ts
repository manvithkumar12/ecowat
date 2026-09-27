import { FindUserRescheduleResponse } from "@/src/components/Dashboard/Schedule/types";
import { apiClient } from "../apiclient";

export const getScheduledAppliances = async (
  baseUrl?: string,
): Promise<FindUserRescheduleResponse> => {
  const url = baseUrl ?? "";
  return await apiClient.get(`${url}/api/schedule-appliances/get`);
};
