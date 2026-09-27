import { apiClient } from "../apiclient";

export const priceHistoryAPi = async (
  startDate: string,
  endDate: string,
  baseUrl?: string,
) => {
  const baseurl = baseUrl ?? "";
  return apiClient.get(
    `${baseurl}/api/price-history?startDate=${startDate}&endDate=${endDate}`,
  );
};
