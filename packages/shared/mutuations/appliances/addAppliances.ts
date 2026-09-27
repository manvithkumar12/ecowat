import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addApplianceApi } from "../../Apiservices/appliances/addAppliance";
import { Appliance } from "../../data/Appliances/appliancesData";

export const useAddAppliance = (baseurl?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appliance: Omit<Appliance, "id">) =>
      addApplianceApi(appliance, baseurl),
    
    onMutate: async (newappliance) => {
      const previous = queryClient.getQueryData<Appliance[]>([
        "user-saved-appliances",
      ]);
      const exists = previous?.some(
        (app: Appliance) =>
          app.name.toLowerCase() === newappliance.name.toLowerCase(),
      );
      if (exists) {
        throw new Error("APPLIANCE_ALREADY_EXISTS");
      }
      queryClient.setQueryData(
        ["user-saved-appliances"],
        (old: Appliance[] = []) => [
          ...old,
          {
            ...newappliance,
            id: Number.parseFloat(Date.now().toString()),
          },
        ],
      );
      return { previous };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["user-saved-appliances"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-saved-appliances"] });
    },
  });
};
