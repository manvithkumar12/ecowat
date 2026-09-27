import { RenewableScheduleExpire } from "@/src/utils/redis/expiry/expireTime";
import { RenewableScheduleKey } from "@/src/utils/redis/keys/redisKeys";
import { redis } from "@/src/utils/redis/redisClient";
import { NextResponse } from "next/server";

const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=51.1657&longitude=10.4515&hourly=shortwave_radiation,cloud_cover,wind_speed_10m&forecast_days=1";

export async function GET() {
  try {
    let redisData = null;
    try {
      redisData = await redis.get(RenewableScheduleKey);
    } catch (redisError) {
      console.error("Redis GET error (renewability):", redisError);
    }

    if (redisData) {
      try {
        return NextResponse.json(JSON.parse(redisData));
      } catch (parseError) {
        console.error("Redis data parse error (renewwability):", parseError);
      }
    }

    const res = await fetch(URL, {
      next: {
        revalidate: 86400,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch renewable data" },
        { status: res.status },
      );
    }

    const data = await res.json();
    try {
      await redis.set(RenewableScheduleKey, JSON.stringify(data), {
        EX: RenewableScheduleExpire,
      });
    } catch (redisError) {
      console.error("Redis SET error (renewability):", redisError);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET /api/renewability:", error);
    return NextResponse.json(
      { message: error.message || "SOMETHING_WRONG" },
      { status: 500 },
    );
  }
}
