export interface RenewableDayProps {
  date: string;
  solar: number;
  wind: number;
  renewablePercentage: number;
}

interface OpenMeteoResponse {
  hourly: {
    time: string[];
    wind_speed_10m: number[];
  };
  daily: {
    time: string[];
    shortwave_radiation_sum: number[];
  };
}
export const getRenewabilityForecast = async (): Promise<
  RenewableDayProps[]
> => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=shortwave_radiation_sum&hourly=wind_speed_10m&forecast_days=7&timezone=Europe/Berlin",
  );

  const data: OpenMeteoResponse = await res.json();

  const windByDay: Record<string, number[]> = {};

  data.hourly.time.forEach((time, index) => {
    const date = time.split("T")[0];

    if (!windByDay[date]) {
      windByDay[date] = [];
    }

    windByDay[date].push(data.hourly.wind_speed_10m[index]);
  });

  return data.daily.time.map((date, index) => {
    const winds = windByDay[date] ?? [];

    const avgWind =
      winds.length > 0
        ? winds.reduce((sum, w) => sum + w, 0) / winds.length
        : 0;

    const solar = data.daily.shortwave_radiation_sum[index];

    // Normalize to 0–100
    const solarScore = Math.min((solar / 25) * 100, 100);
    const windScore = Math.min((avgWind / 25) * 100, 100);

    const renewablePercentage = Math.round(
      solarScore * 0.45 + windScore * 0.55,
    );

    return {
      date,
      solar: Number(solar.toFixed(2)),
      wind: Number(avgWind.toFixed(2)),
      renewablePercentage,
    };
  });
};
