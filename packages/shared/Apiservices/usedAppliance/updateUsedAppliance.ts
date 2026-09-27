import { apiClient } from "../apiclient";

export interface UpdateUsedApplianceInput {
  id: number;
  rating: number;
  usageHours: number;
  totalPrice: number;
}

export const updateUsedApplianceApi = async (
  data: UpdateUsedApplianceInput,
  baseUrl?: string,
) => {
  const baseurl = baseUrl ?? "";
  return apiClient.post(`${baseurl}/api/used-appliance/update`, data);
};
