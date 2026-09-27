import { apiClient } from "../apiclient";

export const changeStatusApi = (
  id: number,
  status: boolean,
  baseUrl?: string,
) => {
  try {
    const url = baseUrl ?? "";
    return apiClient.post(`${url}/api/appliances/changeStatus`, {
      id,
      status,
    });
  } catch (e: any) {
    throw new Error(e.code || e.message || "SOMETHING_WRONG");
  }
};
