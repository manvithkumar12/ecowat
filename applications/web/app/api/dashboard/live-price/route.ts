import { NextRequest, NextResponse } from "next/server";
import { formatedPriceData } from "../../actions/priceData/ProcessPriceData";
import { redis } from "@/src/utils/redis/redisClient";
import { priceDataKey } from "@/src/utils/redis/keys/redisKeys";

export const GET = async (req: NextRequest) => {

  const url = process.env.PRICE_URL;
  
  let redisData = null;
  try {
    redisData = await redis.get(priceDataKey);
  } catch (err) {
    console.error("Redis GET failed for price-data:", err);
  }

  if (redisData) {
    return NextResponse.json(JSON.parse(redisData));
  }

  if (!url) {
    return NextResponse.json({ error: "PRICE_URL not defined" }, { status: 400 });
  }

  try {
    const data = await formatedPriceData(url);

    if (!data) {
      return NextResponse.json({ error: "Failed to fetch current price" }, { status: 500 });
    }
    console.log(data);

    try {
      await redis.set(priceDataKey, JSON.stringify(data), {
        EX: 60 * 60 * 24,
      });
    } catch (err) {
      console.error("Redis SET failed for price-data:", err);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch current price" },
      { status: 500 }
    );
  }
};
