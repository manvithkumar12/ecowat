import { useQuery } from "@tanstack/react-query";
import { fetchCurrentPrice } from "../../dataServices/Dashboard/currentPrice";

export const useCurrentPrice = () => {
  return useQuery({
    queryKey: ["current-price"],
    queryFn: () => fetchCurrentPrice(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
