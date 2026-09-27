import { apiClient } from "../apiclient";

export const deleteApplianceApi = async (id: number, baseurl?: string) => {
  try {
    const url = baseurl ?? "";
    await apiClient.post(`${url}/api/appliances/delete`, {
      id,
    });
  } catch (error: any) {
    console.log(error.code || error.message || "SOMETHING_WRONG");
  }
};
