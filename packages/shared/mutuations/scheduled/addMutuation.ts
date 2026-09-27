import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getScheduledAppliances } from "../../Apiservices/scheduled/addScheduleAppliance";
import { rescheduleAddType } from "../../types/schedule/addType";
import { generateTempId } from "../../utils/generateId";

export const useAddSchedule = (baseUrl?: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: (body: rescheduleAddType) =>
        getScheduledAppliances(body, baseUrl),

      onMutate: async (newSchedule) => {
        await queryClient.cancelQueries({
          queryKey: ["user-schedules-appliances"],
        });
        const previousSchedules = queryClient.getQueryData([
          "user-schedules-appliances",
        ]);

        const tempId = generateTempId();

        queryClient.setQueryData(["user-schedules-appliances"], (old: any) => {
          const oldData = old?.data || [];
          return {
            ...old,
            data: [
              ...oldData,
              {
                ...newSchedule,
                id: tempId,
                endHour: newSchedule.endHourHour,
                appliance: {
                  name: newSchedule.name,
                },
              },
            ],
          };
        });

        return { previousSchedules, tempId };
      },

      onError: (_error, _newSchedule, context) => {
        queryClient.setQueryData(
          ["user-schedules-appliances"],
          context?.previousSchedules,
        );
      },

      onSuccess: (response, _variables, context) => {
        queryClient.setQueryData(["user-schedules-appliances"], (old: any) => {
          const oldData = old?.data || [];
          return {
            ...old,
            data: oldData.map((item: any) =>
              item.id === context?.tempId ? response : item,
            ),
          };
        });
      },
    },
    queryClient,
  );
};
