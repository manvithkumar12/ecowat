export const getCarbonModel = async (carbonValues: number[]) => {
  const modelUrl = process.env.MODEL_URL || "http://127.0.0.1:8000";
  const response = await fetch(`${modelUrl}/carbonPrediction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ carbon_values: carbonValues }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    console.error(`Model prediction failed (${response.status}):`, errText);
    throw new Error("Model prediction failed");
  }

  return await response.json();
};
