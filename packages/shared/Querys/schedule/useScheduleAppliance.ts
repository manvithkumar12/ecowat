import { getScheduledAppliances } from "../../Apiservices/scheduled/getScheduledAppliances";
import { useQuery } from "@tanstack/react-query";

export const useScheduleAppliances = (baseUrl?: string) => {
  return useQuery({
    queryKey: ["user-schedules-appliances"],
    queryFn: () => getScheduledAppliances(baseUrl),
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 3,
    placeholderData: (previousData) => previousData,
  });
};
