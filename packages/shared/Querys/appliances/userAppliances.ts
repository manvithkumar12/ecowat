import { useQuery } from "@tanstack/react-query";
import { getUserAppliances } from "../../Apiservices";

export const useUserAppliance = (baseUrl: string) => {
  return useQuery({
    queryFn: () => getUserAppliances(baseUrl),
    queryKey: ["user-saved-appliances"],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};
