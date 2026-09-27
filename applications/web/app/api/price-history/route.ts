import { priceHistoryExpire } from "@/src/utils/redis/expiry/expireTime";
import { priceHistoryKey } from "@/src/utils/redis/keys/redisKeys";
import { redis } from "@/src/utils/redis/redisClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startDateStr = searchParams.get("startDate");
  const endDateStr = searchParams.get("endDate");
  console.log("starteddd");
  
  if (!startDateStr || !endDateStr) {
    return NextResponse.json(
      {
        error:
          "startDate and endDate (YYYY-MM-DD) query parameters are required",
      },
      { status: 400 },
    );
  }

  try {
    const startParts = startDateStr.split("-").map(Number);
    const endParts = endDateStr.split("-").map(Number);

    if (startParts.length !== 3 || endParts.length !== 3) {
      return NextResponse.json(
        { error: "Invalid date format. Expected YYYY-MM-DD" },
        { status: 400 },
      );
    }

    const [sYear, sMonth, sDay] = startParts;
    const [eYear, eMonth, eDay] = endParts;

    const startDt = new Date(Date.UTC(sYear, sMonth - 1, sDay, 0, 0, 0, 0));
    const endDt = new Date(Date.UTC(eYear, eMonth - 1, eDay + 1, 0, 0, 0, 0));

    const startTimestamp = startDt.getTime();
    const endTimestamp = endDt.getTime();

    const redisData = await redis.get(
      priceHistoryKey(startTimestamp, endTimestamp),
    );

    if (redisData) {
      try {
        const data = JSON.parse(redisData);
        if (data.length !== 0) {
          return NextResponse.json(data);
        }
      } catch (error: any) {
        console.error("Error parsing Redis data:", error);
      }
    }

    const awattarUrl = `https://api.awattar.de/v1/marketdata?start=${startTimestamp}&end=${endTimestamp}`;

    const response = await fetch(awattarUrl);

    if (!response.ok) {
      throw new Error(
        `aWATTar API responded with status ${response.status}: ${response.statusText}`,
      );
    }

    const data = await response.json();
    const cacheKey = priceHistoryKey(startTimestamp, endTimestamp);
    try {
      const result = await redis.set(cacheKey, JSON.stringify(data), {
        EX: priceHistoryExpire,
      });
      console.log("Redis cache saved:", { cacheKey, result });
    } catch (error) {
      console.error("Redis cache write failed:", {
        cacheKey,
        error,
      });
    }
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching price history:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch price history" },
      { status: 500 },
    );
  }
}
