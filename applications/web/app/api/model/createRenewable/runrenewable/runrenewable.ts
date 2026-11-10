import { CreateTodaysData } from "@/app/api/actions/dashboard/weeklyconsumption/createData";
import { deletePrevDays } from "@/app/api/actions/dashboard/weeklyconsumption/deletePrevDays";
import { getRenewabilityForecast, weeklyTempratureApi } from "@ecowat/shared";

export const runRenewableGeneration = async () => {
  const [TemperatureData, RenewableData] = await Promise.all([
    weeklyTempratureApi(),
    getRenewabilityForecast(),
  ]);
  await deletePrevDays();
  await CreateTodaysData(TemperatureData, RenewableData);
  return { code: "SUCCESS" };
};
