import { useQuery } from "@tanstack/react-query";
import { usedApplianceApi } from "../../Apiservices";

export const useUsedAppliance = (
  baseUrl?: string,
  date?: string,
) => {
  return useQuery({
    queryFn: () => usedApplianceApi(baseUrl, date),

    queryKey: ["user-used-appliances", date || "today"],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 30,
  });
};
