import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateUsedApplianceApi,
  UpdateUsedApplianceInput,
} from "../../Apiservices";

export const useUpdateUsedAppliance = (userId: string, baseUrl?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUsedApplianceInput) =>
      updateUsedApplianceApi(data, baseUrl),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-used-appliances", userId],
      });
    },
  });
};
