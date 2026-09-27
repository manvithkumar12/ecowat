import { useQuery } from "@tanstack/react-query";
import {
  renewabilityCheck,
  RenewableData,
} from "../../dataServices/Dashboard/renewabilityCheck";

export const useRenewabilityCheck = (url: string) => {
  return useQuery<RenewableData>({
    queryKey: ["renewability-data-daily", url],
    queryFn: () => renewabilityCheck(url),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!url,
  });
};
