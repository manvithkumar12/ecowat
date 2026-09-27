// actions/model/createRenewable/runRenewableGeneration.ts

import { CreateTodaysData } from "@/app/api/actions/dashboard/weeklyconsumption/createData";
import { deletePrevDays } from "@/app/api/actions/dashboard/weeklyconsumption/deletePrevDays";
import { FindTodaysData } from "@/app/api/actions/dashboard/weeklyconsumption/findTodaysData";
import { getRenewabilityForecast, weeklyTempratureApi } from "@ecowat/shared";

export const runRenewableGeneration = async () => {
  const FindIfAvailable = await FindTodaysData();
  
  if (FindIfAvailable.code === "CONTINUE") {
    const [TemperatureData, RenewableData] = await Promise.all([
      weeklyTempratureApi(),
      getRenewabilityForecast(),
    ]);
    await deletePrevDays();
    await CreateTodaysData(TemperatureData, RenewableData);
    return { code: "SUCCESS" };
  }
  
  return { code: "ALREADY_EXISTS" };
};
