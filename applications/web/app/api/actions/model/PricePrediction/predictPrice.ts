export interface PredictionPayload {
  days30Price: {
    date: string;
    price: number;
  }[];

  forecasts: {
    date: string;
    temperatureMax: number;
    temperatureMin: number;
    windSpeed: number;
    solarRadiation: number;
    dayOfWeek: number;
    month: number;
    isWeekend: boolean;
  }[];
}
export const modelApi = async (data: PredictionPayload) => {
  try {
    const res = await fetch(`${process.env.MODEL_URL}/pricePrediction`, {
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
    return res.json();
  } catch (error) {
    console.log(error);
    throw new Error("SOMETHING_WRONG");
  }
};
