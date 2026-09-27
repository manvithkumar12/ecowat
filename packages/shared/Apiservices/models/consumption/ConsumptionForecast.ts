import { ConsumptionForecast } from "../../../types";
import { apiClient } from "../../apiclient";

export const ConsumptionForecastApi = async (
  baseUrl: string,
): Promise<ConsumptionForecast> => {
  const url = baseUrl ?? "";
  return await apiClient.get(`${url}/api/model/weeklyConsumption`);
};
