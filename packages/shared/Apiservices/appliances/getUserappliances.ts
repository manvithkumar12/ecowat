import { Appliance } from "../../data";
import { Availableappliances } from "../../types";
import { apiClient } from "../apiclient";
type ApplianceRes = {
  id: number;
  name: string;
  power: number;
  usageHours: number;
  kwh: number;
  status: boolean;
};
type AppliancesResponse = {
  code: string;
  appliances: ApplianceRes[];
};

export const getUserAppliances = async (
  baseUrl: string,
): Promise<Appliance[]> => {
  console.log("getUserAppliances API function called! baseurl =", baseUrl);
  const data = await apiClient.get<AppliancesResponse>(
    `${baseUrl}/api/appliances/get`,
  );

  const enhancedData: Appliance[] = data.appliances.map((appliance) => {
    const applianceInfo = Availableappliances.find(
      (a) => a.dbName === appliance.name,
    );

    return {
      id: appliance.id,
      name: applianceInfo?.name ?? appliance.name,
      powerRatingW: appliance.power,
      dailyUsageHours: appliance.usageHours,
      status: appliance.status,
      kwh: appliance.kwh,
      DBName: appliance.name,
      category: applianceInfo?.category ?? "Other",
    };
  });

  return enhancedData;
};
