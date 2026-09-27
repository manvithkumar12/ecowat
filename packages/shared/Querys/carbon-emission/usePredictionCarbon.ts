import { useQuery } from "@tanstack/react-query";
import { predictEmission } from "../../Apiservices/carbon-emission/predictEmission";

export const usePredictCarbon = (baseUrl?: string) => {
  const baseurl = baseUrl ?? "";
  return useQuery({
    queryKey: ["carbon-prediction"],
    queryFn: () => predictEmission(baseurl),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};
