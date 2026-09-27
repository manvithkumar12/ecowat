import { PredictUsageInput } from "@ecowat/shared";
import { AddPredictedData } from "./AddPredictedData";

export const predictConsumption = async (
  userId: string,
  data: PredictUsageInput,
) => {
  try {
    const res = await fetch(`${process.env.MODEL_URL}/weeklyConsumption`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("SOMETHING_WRONG");
    }
    const result = await res.json();
    await Promise.all(
      result.predictions.map((prediction: any) =>
        AddPredictedData(userId, {
          date: prediction.date,
          predictedUsage: prediction.predictedUsage,
        }),
      ),
    );

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("SOMETHING_WRONG");
  }
};
