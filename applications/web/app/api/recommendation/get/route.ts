import {
  generateRecommendations,
  Availableappliances,
  Appliance,
  renewabilityCheck,
} from "@ecowat/shared";
import { formatedPriceData } from "../../actions/priceData/ProcessPriceData";
import { getUserAppliances } from "../../actions/appliances/getAppliances/getAppliances";
import { NextResponse } from "next/server";
import { isloggedin } from "@/src/middleware/isLoggedin";
import { redis } from "@/src/utils/redis/redisClient";
import { recommendationKey } from "@/src/utils/redis/keys/redisKeys";
import { recommendationExpire } from "@/src/utils/redis/expiry/expireTime";

export const GET = isloggedin(async (req, user) => {
  try {
    const urlParams = new URL(req.url).searchParams;
    const applianceName = urlParams.getAll("appliance");

    const priceUrl = process.env.PRICE_URL;
    const renewableUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/renewability`;

    if (!user || !priceUrl) {
      return NextResponse.json({ user, priceUrl }, { status: 401 });
    }

    let cached = null;
    try {
      cached = await redis.get(recommendationKey(user.id));
    } catch (err) {
      console.error("Redis GET error (recommendations):", err);
    }

    if (cached) {
      const parsedData = JSON.parse(cached);
      if (applianceName && applianceName.length > 0) {
        const data = parsedData.filter((item: any) =>
          applianceName.includes(
            item.appliance.toLowerCase().trim().replace(/\s+/g, ""),
          ),
        );
        return NextResponse.json(data);
      }
      return NextResponse.json(parsedData);
    }

    const [appliances, prices, renewable] = await Promise.all([
      getUserAppliances(user.id),
      formatedPriceData(priceUrl),
      renewabilityCheck(renewableUrl),
    ]);

    const formattedAppliances: Appliance[] = appliances.map((appliance) => {
      const dbNameClean = appliance.name.toLowerCase().replace(/[\s-_]+/g, "");
      const applianceInfo = Availableappliances.find(
        (a) => a.dbName === appliance.name || a.dbName === dbNameClean,
      );

      return {
        id: appliance.id,
        name: applianceInfo?.name ?? appliance.name,
        powerRatingW: appliance.power,
        dailyUsageHours: appliance.usageHours,
        status: appliance.status,
        kwh: appliance.kwh,
        DBName: applianceInfo?.dbName ?? dbNameClean,
        category: applianceInfo?.category ?? "Other",
      };
    });

    const recommendations = generateRecommendations(
      formattedAppliances,
      prices.hourlyPrices,
      renewable.hourlyData,
    );
    const result = [];
    try {
      await redis.set(
        recommendationKey(user.id),
        JSON.stringify(recommendations),
        { EX: recommendationExpire },
      );
    } catch (err) {
      console.error("Redis SET error (recommendations):", err);
    }
    if (applianceName && applianceName.length > 0) {
      const data = recommendations.filter((item: any) =>
        applianceName.includes(
          item.appliance
            .toLowerCase()
            .trim()
            .replace(/[\s-]+/g, ""),
        ),
      );
      result.push(...data);
      return NextResponse.json(result);
    }

    return NextResponse.json(recommendations);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Failed to generate recommendations" },
      { status: 500 },
    );
  }
});
