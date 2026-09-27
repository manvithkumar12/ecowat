interface ForecastDay {
  name: string;
  actual?: number | null;
  predicted: number;
  cost: number;
  co2: number;
}

export const sevenDayForecastData: ForecastDay[] = [
  { name: "Mon", actual: 19.8, predicted: 20.5, cost: 160, co2: 9.2 },
  { name: "Tue", actual: 20.9, predicted: 21.3, cost: 168, co2: 9.8 },
  { name: "Wed", actual: 22.1, predicted: 22.8, cost: 179, co2: 10.4 },
  { name: "Thu", actual: 21.8, predicted: 22.1, cost: 173, co2: 10.1 },
  { name: "Fri", actual: 23.9, predicted: 24.2, cost: 191, co2: 11.0 },
  { name: "Sat", actual: null, predicted: 26.0, cost: 205, co2: 11.8 },
  { name: "Sun", actual: null, predicted: 23.7, cost: 186, co2: 10.7 },
];
