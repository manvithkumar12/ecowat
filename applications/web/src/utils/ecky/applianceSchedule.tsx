import { UseMutateFunction } from "@tanstack/react-query";
import { rescheduleAddType } from "@ecowat/shared";
import { toast } from "sonner";

export const calculateEndHour = (startTime?: string, duration?: number) => {
  if (!startTime) return "";
  const parts = startTime.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1] || "00";
  if (isNaN(hours)) return startTime;
  const endHours = (hours + (duration || 0)) % 24;
  return `${endHours.toString().padStart(2, "0")}:${minutes}`;
};

export interface ScheduleParameters {
  id: number;
  name: string;
  power: number;
  powerUnit: string;
  time: string;
  usageHours: number;
}

export const scheduleAppliance = (
  mutate: UseMutateFunction<any, any, rescheduleAddType, any>,
  parameters: ScheduleParameters,
  options: {
    onSuccess: () => void;
    onError: (err: any) => void;
  },
) => {
  const endHour = calculateEndHour(parameters.time, parameters.usageHours);
  mutate(
    {
      applianceId: parameters.id,
      startHour: parameters.time,
      endHourHour: endHour,
      name: parameters.name,
      powerConsumed: parameters.power,
      rating: parameters.power,
    },
    {
      onSuccess: options.onSuccess,
      onError: options.onError,
    },
  );
};

export const handleScheduleClick = (
  mutate: UseMutateFunction<any, any, rescheduleAddType, any>,
  setIsScheduled: (value: boolean) => void,
  parameters: ScheduleParameters,
) => {
  scheduleAppliance(mutate, parameters, {
    onSuccess: () => {
      setIsScheduled(true);
      toast.success(
        `${parameters.name} scheduled successfully for ${parameters.time}!`,
      );
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err?.message || "Failed to schedule appliance.");
    },
  });
};
