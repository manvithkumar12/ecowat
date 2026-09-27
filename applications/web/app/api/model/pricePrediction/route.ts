import { NextResponse } from "next/server";
import { fetchDailyData } from "../../actions/model/weeklyconsumption/getDailyData";
import { get30daysData } from "../../actions/dashboard/pastTime/days30Prediction";
import { modelApi } from "../../actions/model/PricePrediction/predictPrice";
import {
  ForecastDay,
  getRenewabilityForecast,
  RenewableDay,
  TemperatureDay,
  weeklyTempratureApi,
  getGermanDateParts,
} from "@ecowat/shared";
import { FindIsDataAvailable } from "../../actions/dashboard/pricePredict/FindIsDataAvailable";
import { CreatePredictedPrice } from "../../actions/dashboard/pricePredict/CreatePredictedPrice";
import { isloggedin } from "@/src/middleware/isLoggedin";
import { redis } from "@/src/utils/redis/redisClient";
import {
  predictionKey,
  predictionLockKey,
} from "@/src/utils/redis/keys/redisKeys";
import { PriceExpire } from "@/src/utils/redis/expiry/expireTime";

export const POST = isloggedin(async () => {
  let redisData = null;
  let lockAcquired = false;

  try {
    const lock = await redis.set(predictionLockKey, "1", {
      NX: true,
      EX: 120,
    });

    if (lock) {
      lockAcquired = true;
    } else {
      return NextResponse.json(
        { success: false, code: "ALREADY_GENERATING" },
        { status: 200 },
      );
    }
  } catch (redisError) {
    console.error(
      "Redis lock acquisition error (pricePrediction):",
      redisError,
    );
  }

  try {
    try {
      redisData = await redis.get(predictionKey);
    } catch (redisError) {
      console.error("Redis GET error (pricePrediction):", redisError);
    }

    if (redisData) {
      try {
        const data = JSON.parse(redisData);
        return NextResponse.json(
          { data: data, success: true },
          { status: 200 },
        );
      } catch (jsonError) {
        console.error("Redis JSON parse error (pricePrediction):", jsonError);
      }
    }

    const IsAvailable = await FindIsDataAvailable();
    if (IsAvailable.continue === false) {
      try {
        await redis.set(predictionKey, JSON.stringify(IsAvailable.data), {
          EX: 600,
        });
      } catch (redisError) {
        console.error("Redis SET error (pricePrediction):", redisError);
      }
      return NextResponse.json(
        { data: IsAvailable.data, success: true },
        { status: 200 },
      );
    }

    const [todayData, past30Days] = await Promise.all([
      fetchDailyData(),
      get30daysData(),
    ]);

    let forecastDays: ForecastDay[];

    if (todayData?.length > 0) {
      forecastDays = todayData.map((day) => ({
        date: day.date,
        tempMax: day.tempMax,
        tempMin: day.tempMin,
        wind: day.wind,
        solar: day.solar,
      }));
    } else {
      const [temps, renewables] = (await Promise.all([
        weeklyTempratureApi(),
        getRenewabilityForecast(),
      ])) as [TemperatureDay[], RenewableDay[]];

      forecastDays = temps.map((t, i) => ({
        date: t.date,
        tempMax: t.tempMax,
        tempMin: t.tempMin,
        wind: renewables[i]?.wind ?? renewables[0]?.wind ?? 0,
        solar: renewables[i]?.solar ?? renewables[0]?.solar ?? 0,
      }));
    }
    const payload = {
      days30Price: past30Days,
      forecasts: forecastDays.slice(0, 7).map((day) => {
        const parts = getGermanDateParts(day.date);
        return {
          date: day.date,
          temperatureMax: day.tempMax,
          temperatureMin: day.tempMin,
          windSpeed: day.wind,
          solarRadiation: day.solar,
          dayOfWeek: parts.dayOfWeek,
          month: parts.month,
          isWeekend: parts.isWeekend,
        };
      }),
    };
    const result = await modelApi(payload);
    const predictionsInKWh = result.predictions.map((p: any) => ({
      ...p,
      predictedPrice: Number((p.predictedPrice / 1000).toFixed(4)),
    }));
    await CreatePredictedPrice(predictionsInKWh);

    try {
      await redis.set(predictionKey, JSON.stringify(predictionsInKWh), {
        EX: PriceExpire,
      });
    } catch (redisError) {
      console.error("Redis SET error (pricePrediction):", redisError);
    }

    return NextResponse.json({
      success: true,
      data: predictionsInKWh.map((p: any, index: number) => ({
        id: index,
        date: p.date,
        predictedPrice: p.predictedPrice,
      })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "FAILED_TO_GENERATE_PREDICTIONS",
      },
      { status: 500 },
    );
  } finally {
    if (lockAcquired) {
      try {
        await redis.del(predictionLockKey);
      } catch (redisError) {
        console.error("Redis DEL error (pricePrediction):", redisError);
      }
    }
  }
});
