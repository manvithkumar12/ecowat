import { Appliance } from "../../data/Appliances/appliancesData";
import { apiClient } from "../apiclient";

export const addApplianceApi = async (
  newAppliance: Omit<Appliance, "id">,
  baseUrl?: string,
) => {
  const baseurl = baseUrl ?? "";

  return apiClient.post(`${baseurl}/api/appliances/add`, {
    applianceName: newAppliance.name.toLowerCase().replaceAll(" ", ""),
    rating: newAppliance.powerRatingW,
    usage: newAppliance.dailyUsageHours,
    status: newAppliance.status,
  });
};
