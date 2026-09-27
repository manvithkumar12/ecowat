import { getGermanDayBounds } from "@ecowat/shared";

export type HourlyPriceItem = {
  start: number;
  end: number;
  price: number;
};

export type CurrentPriceResponse = {
  currentPrice: number;
  todayAveragePrice: number;
  percentageChange: number;
  priceTrend: "higher" | "lower";
  currentSlot: {
    start: number;
    end: number;
  };
  unit: string;
  highestPrice: number;
  lowestPrice: number;
  past24HoursAverage: number;
  hourlyPrices: HourlyPriceItem[];
};

export const formatedPriceData = async (
  url: string,
): Promise<CurrentPriceResponse> => {
  const { start, end } = getGermanDayBounds();
  const startTimestamp = start.getTime();
  const endTimestamp = end.getTime();

  const separator = url.includes("?") ? "&" : "?";
  const urlWithParams = `${url}${separator}start=${startTimestamp}&end=${endTimestamp}`;
  const res = await fetch(urlWithParams, {
    next: {
      revalidate: 86400,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch current price");
  }

  const data = await res.json();

  const prices = data.data.map((item: any) => ({
    start_timestamp: item.start_timestamp,
    end_timestamp: item.end_timestamp,
    marketprice: Number((item.marketprice / 1000).toFixed(4)),
  }));

  const now = Date.now();

  const currentSlot = prices.find(
    (item: any) => now >= item.start_timestamp && now < item.end_timestamp,
  );

  const currentPrice = currentSlot?.marketprice ?? 0;

  const todayAveragePrice =
    prices.length > 0
      ? prices.reduce((sum: number, item: any) => sum + item.marketprice, 0) /
        prices.length
      : 0;

  const highestPrice = prices.length
    ? Math.max(...prices.map((item: any) => item.marketprice))
    : 0;

  const lowestPrice = prices.length
    ? Math.min(...prices.map((item: any) => item.marketprice))
    : 0;

  const percentageChange =
    ((currentPrice - todayAveragePrice) / todayAveragePrice) * 100;

  return {
    currentPrice: Number(currentPrice.toFixed(4)),

    todayAveragePrice: Number(todayAveragePrice.toFixed(4)),

    percentageChange: Number(Math.abs(percentageChange).toFixed(2)),

    priceTrend: currentPrice >= todayAveragePrice ? "higher" : "lower",

    currentSlot: {
      start: currentSlot?.start_timestamp ?? 0,
      end: currentSlot?.end_timestamp ?? 0,
    },

    unit: "EUR/kWh",

    highestPrice: Number(highestPrice.toFixed(4)),

    lowestPrice: Number(lowestPrice.toFixed(4)),

    past24HoursAverage: Number(todayAveragePrice.toFixed(4)),

    hourlyPrices: prices.map((item: any) => ({
      start: item.start_timestamp,
      end: item.end_timestamp,
      price: Number(item.marketprice.toFixed(4)),
    })),
  };
};
