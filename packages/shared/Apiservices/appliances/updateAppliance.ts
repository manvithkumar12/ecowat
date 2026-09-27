export type newData = {
  id: number;
  powerRatingW: number;
  dailyUsageHours: number;
  status: boolean;
};
export const updateApplianceAPi = async (data: newData, baseurl?: string) => {
  const url = baseurl ?? "";
  const res = await fetch(`${url}/api/appliances/update`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "FAILED_TO_UPDATE");
  }
  return res.json();
};
