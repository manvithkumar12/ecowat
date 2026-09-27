import { getPricePredicted } from "@/app/api/actions/dashboard/pricePredict/getPricePredicted";
import { predictionKey } from "@/src/utils/redis/keys/redisKeys";
import { redis } from "@/src/utils/redis/redisClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const urlParams = new URL(req.url).searchParams;

  const fromDate = urlParams.get("fromDate");
  const toDate = urlParams.get("toDate");

  try {
    if ((fromDate && !toDate) || (!fromDate && toDate)) {
      return NextResponse.json(
        {
          success: false,
          message: "Both fromDate and toDate are required",
        },
        { status: 400 },
      );
    }

    let redisData = null;

    try {
      redisData = await redis.get(predictionKey);
    } catch (redisError) {
      console.error("Redis GET error (pricePrediction):", redisError);
    }

    if (redisData) {
      try {
        const data = JSON.parse(redisData);

        const filteredData =
          fromDate && toDate
            ? data.filter(
                (item: any) => item.date >= fromDate && item.date <= toDate,
              )
            : data;

        return NextResponse.json({
          data: filteredData,
          success: true,
        });
      } catch (jsonError) {
        console.error("Redis JSON parse error (pricePrediction):", jsonError);
      }
    }

    const result = await getPricePredicted(fromDate, toDate);

    if (result.status !== 200) {
      return NextResponse.json(
        {
          data: [],
          success: false,
          error: result.error,
        },
        { status: result.status },
      );
    }

    return NextResponse.json({
      data: result.data,
      success: true,
    });
  } catch (error) {
    console.error("Price prediction GET error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "FAILED_TO_FETCH_PREDICTIONS",
      },
      { status: 500 },
    );
  }
};
