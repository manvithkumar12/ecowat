import { apiClient } from "../apiclient";

interface CarbonResponse {
  monthlyValue: number;
  weeklyData: DataResponse[];
  monthlyData: DataResponse[];
  weeklyValue: number;
}
interface DataResponse {
  date: string;
  usage: number;
  carbonEmission: number;
}

export const getCarbonEmission = async (
  baseUrl?: string,
): Promise<CarbonResponse> => {
  const baseurl = baseUrl ?? "";
  return apiClient.get(`${baseurl}/api/carbon-emission/user-usage`)
};
