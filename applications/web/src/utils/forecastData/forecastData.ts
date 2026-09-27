import { PredictCarbonResponse } from "@ecowat/shared";

const DAY_ABBR: ("Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat")[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export interface ForecastDataPoint {
  day: string;
  emission: number;
  co2: number;
}

export interface ForecastDataOutput {
  totalProjected: string;
  forecastData: ForecastDataPoint[];
}

export const forecastData = (
  data: PredictCarbonResponse,
  tDays: (key: string) => string,
): ForecastDataOutput => {
  const chartData =
    data.predictedNext7Days && data.predictedNext7Days.length > 0
      ? data.predictedNext7Days.map((val, i) => {
          const d = new Date();
          d.setDate(d.getDate() + i);
          const dayKey = DAY_ABBR[d.getDay()];
          return {
            day: tDays(dayKey),
            emission: Number(val.toFixed(1)),
            co2: Number(val.toFixed(1)),
          };
        })
      : [
          { day: tDays("Mon"), emission: 2.1, co2: 2.1 },
          { day: tDays("Tue"), emission: 2.4, co2: 2.4 },
          { day: tDays("Wed"), emission: 2.7, co2: 2.7 },
          { day: tDays("Thu"), emission: 2.5, co2: 2.5 },
          { day: tDays("Fri"), emission: 2.9, co2: 2.9 },
          { day: tDays("Sat"), emission: 3.2, co2: 3.2 },
          { day: tDays("Sun"), emission: 3.0, co2: 3.0 },
        ];

  const totalProjected =
    data.predictedNext7Days && data.predictedNext7Days.length > 0
      ? data.predictedNext7Days.reduce((acc, curr) => acc + curr, 0).toFixed(1)
      : "18.8";
  return {
    totalProjected,
    forecastData: chartData,
  };
};
