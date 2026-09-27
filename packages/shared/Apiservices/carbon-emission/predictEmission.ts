import { apiClient } from "../apiclient";

export interface PredictCarbonResponse {
  past7Days: number[];
  predictedNext7Days: number[];
}

export const predictEmission = async (
  baseUrl?: string,
): Promise<PredictCarbonResponse> => {
  const baseurl = baseUrl ?? "";
  return apiClient.get<PredictCarbonResponse>(
    `${baseurl}/api/carbon-emission/predict`,
  );
};

