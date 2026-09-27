import { ConsumptionForecast } from "@ecowat/shared";

export interface DummyConsumptionItem {
  day: string;
  Predicted: number;
  Actual?: number;
}

export const FindForecastValues = (data: DummyConsumptionItem[]) => {
  if (!data || data.length === 0) {
    return {
      HighestDay: "",
      highestValue: "",
      LowestDay: "",
      lowestValue: "",
      DailyAverage: 0,
    };
  }
  const days = data.map((item) => item.day);
  const predicted = data.map((item) => item.Predicted);

  const highestPredicted = Math.max(...predicted);
  const lowestPredicted = Math.min(...predicted);
  const highestDay = days[predicted.indexOf(highestPredicted)];
  const lowestDay = days[predicted.indexOf(lowestPredicted)];
  const dailyAverage =
    predicted.reduce((acc, val) => acc + val, 0) / predicted.length;
  return {
    HighestDay: highestDay,
    highestValue: highestPredicted.toString() + " kWh",
    LowestDay: lowestDay,
    lowestValue: lowestPredicted.toString() + " kWh",
    DailyAverage: dailyAverage,
  };
};

export const FindActualValues = (
  data: ConsumptionForecast,
  language: string = "en-DE",
) => {
  if (!data || !data.predictedUsage || data.predictedUsage.length === 0) {
    return {
      HighestDay: "",
      highestValue: "",
      LowestDay: "",
      lowestValue: "",
      DailyAverage: 0,
    };
  }
  const days = data.predictedUsage.map((item) =>
    new Date(item.date).toLocaleDateString(language, {
      weekday: "short",
      timeZone: "Europe/Berlin",
    }),
  );
  const predicted = data.predictedUsage.map((item) => item.predictedUsage);

  const highestPredicted = Math.max(...predicted);
  const lowestPredicted = Math.min(...predicted);
  const highestDay = days[predicted.indexOf(highestPredicted)];
  const lowestDay = days[predicted.indexOf(lowestPredicted)];
  const dailyAverage =
    predicted.reduce((acc, val) => acc + val, 0) / predicted.length;
  return {
    HighestDay: highestDay,
    highestValue: highestPredicted.toString() + " kWh",
    LowestDay: lowestDay,
    lowestValue: lowestPredicted.toString() + " kWh",
    DailyAverage: dailyAverage,
  };
};
