import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteApplianceApi } from "../../Apiservices/appliances/deleteAppliances";
import { Appliance } from "../../data/Appliances/appliancesData";

export const useApplianceDelete = (baseurl?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteApplianceApi(id, baseurl),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["user-saved-appliances"],
      });
      const prevData = queryClient.getQueryData<Appliance[]>([
        "user-saved-appliances",
      ]);
      queryClient.setQueryData(
        ["user-saved-appliances"],
        (old: Appliance[] = []) => old.filter((app) => app.id !== id),
      );
      return { prevData, id };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["user-saved-appliances"], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-saved-appliances"] });
    },
  });
};
