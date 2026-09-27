import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addUsedApplianceApi,
  AddUsedApplianceInput,
  UsedAppliance,
} from "../../Apiservices";
import { generateTempId } from "../../utils/generateId";

export const useAddUsedAppliance = (
  date?: string,
  isSchedule?: boolean,
  baseUrl?: string,
) => {
  const queryClient = useQueryClient();
  const finalDate = date ?? "today";
  return useMutation({
    mutationFn: (data: AddUsedApplianceInput) =>
      addUsedApplianceApi(data, baseUrl),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["user-used-appliances", finalDate],
      });
      const previous = queryClient.getQueryData<UsedAppliance[]>([
        ["user-used-appliances", finalDate],
      ]);
      const tempId = generateTempId();
      queryClient.setQueryData(
        ["user-used-appliances", finalDate],
        (old: any) => {
          const oldData = old?.data || [];
          return {
            ...old,
            data: [
              ...oldData,
              {
                ...newData,
                id: tempId,
                appliance: { name: newData.applianceName },
              },
            ],
          };
        },
      );
      return { previous, tempId, date: finalDate };
    },
    onError: (_error, _newSchedule, context) => {
      queryClient.setQueryData(
        ["user-used-appliances", context?.date],
        context?.previous,
      );
    },
    onSuccess: (response: any, variables, context) => {
      queryClient.setQueryData(
        ["user-used-appliances", context?.date],
        (old: any) => {
          const oldData = old?.data || [];
          return {
            ...old,
            data: oldData.map((item: any) =>
              item.id === context?.tempId
                ? {
                    ...response.data,
                    appliance: {
                      name:
                        response.data.applianceName ??
                        response.data.appliance.name,
                    },
                    usageHours: response.data.hoursUsed,
                  }
                : item,
            ),
          };
        },
      );

      if (isSchedule && variables.scheduleId != null) {
        queryClient.setQueryData(
          ["user-schedules-appliances"],
          (old: any) => {
            if (!old) return old;
            return {
              ...old,
              data: (old.data ?? []).filter(
                (item: any) => item.id !== variables.scheduleId,
              ),
            };
          },
        );
      }
    },
  });
};
