import { useQuery } from "@tanstack/react-query";
import { priceHistoryAPi } from "../../Apiservices/price-history/priceHistory";

export const usePriceHistory = (
  startDate: string,
  endDate: string,
  baseUrl?: string,
) => {
  return useQuery({
    queryKey: ["price-history", startDate, endDate],
    queryFn: () => priceHistoryAPi(startDate, endDate, baseUrl),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 30,
  });
};
