export interface WeatherForecast {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}
export interface DailyTemperature {
  date: string;
  tempMin: number;
  tempMax: number;
}
export const weeklyTempratureApi = async (): Promise<DailyTemperature[]> => {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin",
  );

  const data = await response.json();

  return data.daily.time.map((date: string, index: number) => ({
    date,
    tempMin: data.daily.temperature_2m_min[index],
    tempMax: data.daily.temperature_2m_max[index],
  }));
};
