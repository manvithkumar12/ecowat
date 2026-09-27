import { useQuery } from "@tanstack/react-query";
import { getWeeklyPrice } from "../../Apiservices/models/userWeeklyPrice/getWeeklyPrice";

export const useUserPrice = (baseUrl?: string) => {
  return useQuery({
    queryFn: () => getWeeklyPrice(baseUrl || ""),
    queryKey: ["user-weekly-price-data"],
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
  });
};
