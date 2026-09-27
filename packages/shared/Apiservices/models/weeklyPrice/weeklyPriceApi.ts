import { PricePrediction, PricePredictionResponse } from "../../../types";
import { apiClient } from "../../apiclient";

export const weeklyPriceApi = async (
  baseUrl?: string,
): Promise<PricePrediction[]> => {
  const url = baseUrl ?? "";

  const response = await apiClient.post<PricePredictionResponse>(
    `${url}/api/model/pricePrediction`,
    {},
  );

  return response.data;
};
