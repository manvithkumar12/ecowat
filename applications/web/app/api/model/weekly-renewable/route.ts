import { isloggedin } from "@/src/middleware/isLoggedin";
import { getRenewableMacros } from "../../actions/model/renewability/getrenewableMacros";
import { NextResponse } from "next/server";
import { CreateRenewableData } from "../../actions/model/createRenewable/CreateRenewableData";
import { redis } from "@/src/utils/redis/redisClient";
import { weeklyRenewableKey } from "@/src/utils/redis/keys/redisKeys";
import { RenewableExpire } from "@/src/utils/redis/expiry/expireTime";

export const GET = isloggedin(async () => {
  try {
    let redisData = null;
    try {
      redisData = await redis.get(weeklyRenewableKey);
    } catch (redisError) {
      console.error("Redis GET error (weekly-renewable):", redisError);
    }

    if (redisData) {
      try {
        return NextResponse.json(
          { data: JSON.parse(redisData) },
          { status: 200 },
        );
      } catch (jsonError) {
        console.error("Redis JSON parse error (weekly-renewable):", jsonError);
      }
    }
    let dailyData = await getRenewableMacros();
    if (dailyData.length < 7) {
      await CreateRenewableData();
      dailyData = await getRenewableMacros();
    }
    try {
      await redis.set(weeklyRenewableKey, JSON.stringify(dailyData), {
        EX: RenewableExpire,
      });
    } catch (redisError) {
      console.error("Redis SET error (weekly-renewable):", redisError);
    }
    return NextResponse.json({ data: dailyData }, { status: 200 });
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
