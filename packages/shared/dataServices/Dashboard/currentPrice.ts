export const fetchCurrentPrice = async (baseurl?: string) => {
  const url = baseurl ?? "";
  const res = await fetch(`${url}/api/dashboard/live-price`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch current price");
  }
  return res.json();
};
