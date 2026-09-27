export const usePriceModel = async (pastData: number[]) => {
  const res = await fetch(`${process.env.MODEL_URL}/predict-user-price`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ past_week_price: pastData }),
  });
  const data = await res.json();
  return data;
};
