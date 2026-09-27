import { Appliance } from "@ecowat/shared";

export const getConsumption = (item: Appliance) =>
  `${((item.powerRatingW * item.dailyUsageHours) / 1000).toFixed(1)} kWh/day`;

export const isEnabled = (item: Appliance) => item.status === true;

export const getTotalConsumption = (appliances: Appliance[]) =>
  appliances
    .reduce(
      (total, item) =>
        total + (item.powerRatingW * item.dailyUsageHours) / 1000,
      0,
    )
    .toFixed(1);
