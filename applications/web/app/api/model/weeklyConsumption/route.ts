import { isloggedin } from "@/src/middleware/isLoggedin";
import { NextRequest, NextResponse } from "next/server";
import { fetchDailyData } from "../../actions/model/weeklyconsumption/getDailyData";
import { fetchYesterdayUsage } from "../../actions/model/weeklyconsumption/fetchYesterdayUsage";
import { getUsersAppliance } from "../../actions/model/weeklyconsumption/getUsersAppliance";
import { weekAverageData } from "../../actions/model/weeklyconsumption/weekAverage";
import { getHouseholdSize } from "../../actions/model/weeklyconsumption/getHouseholdSize";
import { predictConsumption } from "@/ApiServices/model/consumption/weeklyConsumption";
import { findWeeklyConsumptionData } from "../../actions/model/weeklyconsumption/findConsumptionData";
import { replacePredictions } from "../../actions/model/weeklyconsumption/replacePredictions";
import { redis } from "@/src/utils/redis/redisClient";
import { userWeeklyConsumptionKey } from "@/src/utils/redis/keys/redisKeys";
import { userWeeklyConsumptionExpire } from "@/src/utils/redis/expiry/expireTime";

export const GET = isloggedin(async (req: NextRequest, user) => {
  const fromDate = new URL(req.url).searchParams.get("fromDate");
  const toDate = new URL(req.url).searchParams.get("toDate");

  try {
    if (!user?.id) {
      return NextResponse.json({ code: "UNABLE_TO_GET" }, { status: 407 });
    }
    let redisData = null;
    try {
      redisData = await redis.get(userWeeklyConsumptionKey(user.id));
    } catch (redisError) {
      console.error("Redis GET error (weeklyConsumption):", redisError);
    }

    if (redisData) {
      try {
        let data = JSON.parse(redisData);
        if (fromDate && toDate) {
          data = data.filter(
            (item: any) => item.date >= fromDate && item.date <= toDate,
          );
          return NextResponse.json({ predictedUsage: data });
        }
        return NextResponse.json({ predictedUsage: data });
      } catch (jsonError) {
        console.error("Redis JSON parse error (weeklyConsumption):", jsonError);
      }
    }

    const validation = await findWeeklyConsumptionData(user.id,fromDate,toDate);
    if ("data" in validation) {
      try {
        await redis.set(
          userWeeklyConsumptionKey(user.id),
          JSON.stringify(validation.data),
          { EX: userWeeklyConsumptionExpire },
        );
      } catch (redisError) {
        console.error("Redis SET error (weeklyConsumption):", redisError);
      }
      return NextResponse.json({ predictedUsage: validation.data });
    }
    const [householdSize, dailyData, yesterdayUsage, appliances, weekAverage] =
      await Promise.all([
        getHouseholdSize(user.id),
        fetchDailyData(),
        fetchYesterdayUsage(user.id),
        getUsersAppliance(user.id),
        weekAverageData(user.id),
      ]);
    if (!weekAverage.avgLast7Days) {
      return NextResponse.json(
        {
          noData: true,
          predictedUsage: [],
        },
        { status: 200 },
      );
    }
    if (!dailyData) {
      return NextResponse.json({ code: "UNABLE_TO_FETCH" }, { status: 409 });
    }
    const predictedUsage = await predictConsumption(user.id, {
      householdSize: householdSize.size || 0,
      month: householdSize.month,
      yesterdayUsage: yesterdayUsage.hoursUsage,
      avgLast7Days: weekAverage.avgLast7Days,
      appliances: appliances,
      weather: dailyData,
    });
    await replacePredictions(user.id, predictedUsage.predictions);
    try {
      await redis.set(
        userWeeklyConsumptionKey(user.id),
        JSON.stringify(predictedUsage.predictions),
        { EX: userWeeklyConsumptionExpire },
      );
    } catch (redisError) {
      console.error("Redis SET error (weeklyConsumption):", redisError);
    }
    return NextResponse.json({ predictedUsage: predictedUsage.predictions });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        code: error.code || error.message || "SOMETHING_WRONG",
      },
      { status: 500 },
    );
  }
});
