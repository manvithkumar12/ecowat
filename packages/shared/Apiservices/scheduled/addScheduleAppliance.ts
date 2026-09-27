import { apiClient } from "../apiclient";
import { rescheduleAddType } from "../../types/schedule/addType";

export interface AddScheduleResponse {
  success: boolean;
  data: AddScheduleResponse;
}

export const getScheduledAppliances = async (
  body: rescheduleAddType,
  baseUrl?: string,
): Promise<AddScheduleResponse> => {
  const url = baseUrl ?? "";

  const response = await apiClient.post<AddScheduleResponse>(
    `${url}/api/schedule-appliances/add`,
    body,
  );

  return response.data;
};
