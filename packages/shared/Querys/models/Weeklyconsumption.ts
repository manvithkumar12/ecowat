import { useQuery } from "@tanstack/react-query";
import { ConsumptionForecastApi } from "../../Apiservices/models/consumption/ConsumptionForecast";

export const useConsumptionForecast = (userId: string, baseUrl?: string) => {
  return useQuery({
    queryFn: () => ConsumptionForecastApi(baseUrl || ""),
    queryKey: ["consumption-forecast", userId],
    enabled: !!userId,
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    placeholderData: (previousData) => previousData,
  });
};
