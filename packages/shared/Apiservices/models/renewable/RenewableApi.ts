import { apiClient } from "../../apiclient";

type RenewableType = {
  solar: number;
  wind: number;
  date: string;
};

export type RenewableResponse = {
  data: RenewableType[];
};

export const renewableApi = async (
  baseUrl?: string,
): Promise<RenewableResponse> => {
  const url = baseUrl ?? "";
  return apiClient.get(`${url}/api/model/weekly-renewable`);
};
