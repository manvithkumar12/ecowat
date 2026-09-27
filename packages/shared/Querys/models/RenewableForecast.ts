import { useQuery } from "@tanstack/react-query";
import { renewableApi } from "../../Apiservices/models/renewable/RenewableApi";

export const useRenewableData = (userId: string, baseUrl?: string) => {
  return useQuery({
    queryFn: () => renewableApi(baseUrl),
    queryKey: ["weekly-renewable-data", userId],
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: (previousData) => previousData,
  });
};
