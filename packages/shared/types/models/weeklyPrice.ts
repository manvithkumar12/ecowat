export interface PricePrediction {
  id: number;
  date: string;
  predictedPrice: number;
}

export interface PricePredictionResponse {
  success: boolean;
  data: PricePrediction[];
}
