import { EckyModelResponse } from "../../types/models/eckymodelRes";
import { apiClient } from "../apiclient";

export const postToEcky = async (
  question: string,
  baseUrl?: string,
): Promise<EckyModelResponse> => {
  const url = baseUrl ?? "";

  return await apiClient.post<EckyModelResponse>(`${url}/api/ecky-model`, {
    question,
  });
};
