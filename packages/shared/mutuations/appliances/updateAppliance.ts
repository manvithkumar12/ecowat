import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  newData,
  updateApplianceAPi,
} from "../../Apiservices/appliances/updateAppliance";
import { Appliance } from "../../data/Appliances/appliancesData";

export const useUpdateAppliance = (baseurl?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: newData) => updateApplianceAPi(data, baseurl),
    onMutate: async (newData: newData) => {
      await queryClient.cancelQueries({
        queryKey: ["user-saved-appliances"],
      });
      const previousData = queryClient.getQueryData([
        "user-saved-appliances",
      ]);
      queryClient.setQueryData(
        ["user-saved-appliances"],
        (old: Appliance[]) =>
          old.map((appliance) =>
            appliance.id === newData.id
              ? { ...appliance, ...newData }
              : appliance,
          ),
      );
      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["user-saved-appliances"],
        context?.previousData,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-saved-appliances"] });
    },
  });
};
