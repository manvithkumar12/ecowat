import { NextRequest, NextResponse } from "next/server";
import { updateAppliance } from "../../actions/appliances/updateAppliance/updateAppliance";
import { isloggedin } from "@/src/middleware/isLoggedin";
import { redis } from "@/src/utils/redis/redisClient";
import { applianceDbType } from "@ecowat/shared";
import { applianceKey } from "@/src/utils/redis/keys/redisKeys";
import { applianceExpire } from "@/src/utils/redis/expiry/expireTime";

export const POST = isloggedin(async (req: NextRequest, user) => {
  try {
    const body = await req.json();
    const { powerRatingW, dailyUsageHours, id, status } = body;
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ code: "PLEASE_LOGIN_AGAIN" }, { status: 401 });
    }

    if (
      powerRatingW === undefined ||
      dailyUsageHours === undefined ||
      !id ||
      status === undefined
    ) {
      return NextResponse.json({ code: "MISSING_FIELDS" }, { status: 400 });
    }

    let redisData = null;
    try {
      redisData = await redis.get(applianceKey(userId));
    } catch (err) {
      console.error("Redis GET failed:", err);
    }

    const updated = await updateAppliance(userId, {
      id,
      powerRatingW,
      dailyUsageHours,
      status,
    });

    if (redisData) {
      try {
        const appliances = JSON.parse(redisData) as applianceDbType[];
        const updatedAppliances = appliances.map((app: applianceDbType) =>
          app.id === id ? updated : app,
        );
        await redis.set(
          applianceKey(userId),
          JSON.stringify(updatedAppliances),
          { EX: applianceExpire },
        );
      } catch (err) {
        console.error("Redis SET failed:", err);
      }
    }

    return NextResponse.json({ code: "SUCCESS" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 403 });
    }
    return NextResponse.json({ code: "SOMETHING_WRONG" }, { status: 500 });
  }
});
