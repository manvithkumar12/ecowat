import { useQuery } from "@tanstack/react-query";
import { weeklyPriceApi } from "../../Apiservices/models/weeklyPrice/weeklyPriceApi";

export const useWeeklyPricePred = (baseUrl?: string) => {
  return useQuery({
    queryFn: () => weeklyPriceApi(baseUrl),
    queryKey: ["weekly-price-pred-v2"],
    enabled: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    placeholderData: (previousData) => previousData,
  });
};
