import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatusApi } from "../../Apiservices/appliances/updateStatus";
import { Appliance } from "../../data/Appliances/appliancesData";

type NewData = {
  id: number;
  CurrentStatus: boolean;
};
export const useChangeStatus = (baseUrl?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewData) =>
      changeStatusApi(data.id, data.CurrentStatus, baseUrl),

    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["user-saved-appliances"],
      });

      const previousData = queryClient.getQueryData<Appliance[]>([
        "user-saved-appliances",
      ]);

      queryClient.setQueryData<Appliance[]>(
        ["user-saved-appliances"],

        (old = []) =>
          old.map((e) =>
            e.id === data.id ? { ...e, status: !data.CurrentStatus } : e,
          ),
      );

      return { previousData };
    },

    onError: (_err, _data, context) => {
      queryClient.setQueryData(
        ["user-saved-appliances"],
        context?.previousData,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-saved-appliances"],
      });
    },
  });
};
