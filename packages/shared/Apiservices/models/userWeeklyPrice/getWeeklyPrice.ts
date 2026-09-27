import { apiClient } from "../../apiclient";

export const getWeeklyPrice = async (baseUrl?: string): Promise<number[]> => {
  const url = baseUrl ?? "";
  return apiClient.get(`${url}/api/model/weekly-user-price`);
};
