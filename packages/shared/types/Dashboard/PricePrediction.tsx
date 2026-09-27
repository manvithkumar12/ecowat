export interface TemperatureDay {
  date: string;
  tempMax: number;
  tempMin: number;
}

export type RenewableDay = {
  wind: number;
  solar: number;
};

export interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  wind: number;
  solar: number;
}
