import { getGermanTime } from "../../utils/Time/germanTime";

export type HourlyRenewableData = {
  hour: string;
  solarScore: number;
  windScore: number;
  cloudScore: number;
  renewableScore: number;
  status: "Low" | "Moderate" | "High" | "Excellent";
};

export type RenewableData = {
  score: number;
  status: "Low" | "Moderate" | "High" | "Excellent";
  solarScore: number;
  windScore: number;
  bestHours: string[];
  hourlyData: HourlyRenewableData[];
  currentTime: string;
};

export const renewabilityCheck = async (
  url: string,
): Promise<RenewableData> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch renewable data");
  }

  const data = await res.json();

  const { time, shortwave_radiation, cloud_cover, wind_speed_10m } =
    data.hourly;

  const maxSolar = Math.max(...shortwave_radiation);

  const hourlyData: HourlyRenewableData[] = time.map(
    (hour: string, index: number) => {
      const solar =
        maxSolar > 0
          ? Math.round((shortwave_radiation[index] / maxSolar) * 100)
          : 0;

      const wind = Math.min(
        100,
        Math.round((wind_speed_10m[index] / 20) * 100),
      );

      const cloud = 100 - cloud_cover[index];

      const renewableScore = Math.round(solar * 0.7 + cloud * 0.2 + wind * 0.1);

      let status: "Low" | "Moderate" | "High" | "Excellent";

      if (renewableScore >= 80) status = "Excellent";
      else if (renewableScore >= 60) status = "High";
      else if (renewableScore >= 40) status = "Moderate";
      else status = "Low";

      const hourNumber = Number(hour.split("T")[1].split(":")[0]);

      return {
        hour: String(hourNumber),
        solarScore: solar,
        windScore: wind,
        cloudScore: cloud,
        renewableScore,
        status,
      };
    },
  );

  const bestHours = [...hourlyData]
    .sort((a, b) => b.renewableScore - a.renewableScore)
    .slice(0, 5)
    .map((h) => h.hour);

  const currentHour = Number(getGermanTime(Date.now()).split(":")[0]);

  const currentHourData =
    hourlyData.find((item) => Number(item.hour) === currentHour) ??
    hourlyData[0];

  const currentTime = getGermanTime(Date.now());

  return {
    score: currentHourData.renewableScore,
    status: currentHourData.status,
    solarScore: currentHourData.solarScore,
    windScore: currentHourData.windScore,
    bestHours,
    hourlyData,
    currentTime,
  };
};
