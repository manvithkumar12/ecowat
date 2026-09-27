import { isloggedin } from "@/src/middleware/isLoggedin";
import {
  getUsedAppliances,
  getPast30DaysStats,
} from "../../actions/usedAppliances/findUsedAppliance";
import { NextResponse } from "next/server";
import { fetchYesterdayUsage } from "../../actions/model/weeklyconsumption/fetchYesterdayUsage";
import { redis } from "@/src/utils/redis/redisClient";
import { userUsedApplianceKey } from "@/src/utils/redis/keys/redisKeys";
import { usedApplianceExpire } from "@/src/utils/redis/expiry/expireTime";

export const GET = isloggedin(async (req, user) => {
  if (!user?.id) {
    return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);

    const date = searchParams.get("date") || undefined;
    const fromDate = searchParams.get("fromDate") || date || undefined;
    const toDate = searchParams.get("toDate") || date || undefined;
    const applianceNames = searchParams.getAll("applianceName");
    const applianceFilter =
      applianceNames.length > 0 ? applianceNames : undefined;

    const isSingleDay = fromDate === toDate;
    const cacheKeyDate = fromDate || "today";
    const canCache = isSingleDay && !applianceFilter;

    let redisData = null;

    if (canCache) {
      try {
        redisData = await redis.get(
          userUsedApplianceKey(user.id, cacheKeyDate),
        );
      } catch (redisError) {
        console.error("Redis GET error (used-appliance/get):", redisError);
      }

      if (redisData) {
        try {
          return NextResponse.json(JSON.parse(redisData));
        } catch (parseError) {
          console.error(
            "Redis data parse error (used-appliance/get):",
            parseError,
          );
        }
      }
    }

    const [usedAppliances, yesterdayUsage, thirtyDayStats] = await Promise.all([
      getUsedAppliances(user.id, fromDate, toDate, applianceFilter),

      fetchYesterdayUsage(user.id),

      getPast30DaysStats(user.id),
    ]);

    const mappedData = usedAppliances.map((app) => ({
      id: app.id,
      appliance: {
        name: app.applianceName,
      },
      usageHours: app.hoursUsed,
      kwh: app.kwh,
      rating: app.rating,
      totalPrice: app.totalPrice,
      date: app.date,
    }));

    const responseData = applianceFilter
      ? {
          data: mappedData,
        }
      : {
          data: mappedData,
          yesterdayUsage: yesterdayUsage.kwUsed,
          past30DaysCost: thirtyDayStats.cost,
          past30DaysSavings: thirtyDayStats.savings,
        };

    if (canCache) {
      try {
        await redis.set(
          userUsedApplianceKey(user.id, cacheKeyDate),
          JSON.stringify(responseData),
          {
            EX: usedApplianceExpire,
          },
        );
      } catch (redisError) {
        console.error("Redis SET error (used-appliance/get):", redisError);
      }
    }

    return NextResponse.json(responseData, {
      status: 200,
    });
  } catch (error) {
    console.error("Error in used-appliance get route:", error);

    return NextResponse.json({ code: "SOMETHING_WRONG" }, { status: 500 });
  }
});
