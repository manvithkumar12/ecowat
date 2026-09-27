import { useQuery } from "@tanstack/react-query";
import { getCarbonEmission } from "../../Apiservices/carbon-emission/getCarbonEmission";

export const useCarbonEmission = (baseUrl?: string) => {
  return useQuery({
    queryKey: ["user-carbon-emission"],
    queryFn: () => getCarbonEmission(baseUrl),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};
