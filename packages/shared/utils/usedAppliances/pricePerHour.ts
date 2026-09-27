import { getGermanHour } from "../Time/germanTime";

export const getPriceForHour = (hour: number, hourlyPrices: any[]) => {
  if (!hourlyPrices || hourlyPrices.length === 0) return 0.35; // default fallback
  const match = hourlyPrices.find((item) => {
    const itemDate = new Date(item.start);
    return getGermanHour(item.start) === hour;
  });
  if (match) return match.price;
  if (hourlyPrices[hour]) {
    return hourlyPrices[hour].price;
  }
  return 0.35;
};
