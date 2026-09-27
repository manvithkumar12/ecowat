import { getGermanDateString } from "@ecowat/shared";

export const publicUrls = async (startDate: string, endDate: string) => ({
  priceUrl:
    `https://api.energy-charts.info/price?` +
    `bzn=DE-LU&start=${startDate}&end=${endDate}`,
  weatherUrl:
    `https://archive-api.open-meteo.com/v1/archive?` +
    `latitude=52.52&longitude=13.41` +
    `&start_date=${startDate}` +
    `&end_date=${endDate}` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&timezone=Europe%2FBerlin`,
});

export const get30daysData = async () => {
  try {
    const end = new Date();
    const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

    const startDate = getGermanDateString(start);
    const endDate = getGermanDateString(end);
    const urls = await publicUrls(startDate, endDate);
    const priceUrl = urls.priceUrl;

    const weatherUrl = urls.weatherUrl;

    const [priceResponse, weatherResponse] = await Promise.all([
      fetch(priceUrl),
      fetch(weatherUrl),
    ]);

    if (!priceResponse.ok) {
      throw new Error("Failed to fetch electricity prices");
    }

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const priceData = await priceResponse.json();
    const weatherData = await weatherResponse.json();

    const prices = priceData.price;
    const timestamps = priceData.unix_seconds;

    const dataset = prices.map((price: number, index: number) => ({
      price,
      date: new Date(timestamps[index] * 1000),
    }));

    const dailyMap = new Map<
      string,
      {
        total: number;
        count: number;
      }
    >();

    for (const item of dataset) {
      const day = item.date.toLocaleDateString("en-CA", {
        timeZone: "Europe/Berlin",
      });
      if (!dailyMap.has(day)) {
        dailyMap.set(day, {
          total: 0,
          count: 0,
        });
      }

      const current = dailyMap.get(day)!;

      current.total += item.price;
      current.count += 1;
    }

    const dailyAverages = Array.from(dailyMap.entries())
      .map(([date, values]) => ({
        date,
        price: values.total / values.count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const weatherMap = new Map();

    weatherData.daily.time.forEach((date: string, index: number) => {
      weatherMap.set(date, {
        temperatureMax: weatherData.daily.temperature_2m_max[index],
        temperatureMin: weatherData.daily.temperature_2m_min[index],
      });
    });

    const mergedData = dailyAverages.map((day) => ({
      ...day,
      temperatureMax: weatherMap.get(day.date)?.temperatureMax ?? null,
      temperatureMin: weatherMap.get(day.date)?.temperatureMin ?? null,
    }));
    return mergedData;
  } catch (error) {
    console.log(error);
    throw new Error("30_DAYS_PRICE_FAILED");
  }
};
