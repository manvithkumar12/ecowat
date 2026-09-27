import { isloggedin } from "@/src/middleware/isLoggedin";
import { NextRequest, NextResponse } from "next/server";
import { deleteAppliance } from "../../actions/appliances/deleteAppliance/deleteAppliance";
import { redis } from "@/src/utils/redis/redisClient";
import { applianceDbType } from "@ecowat/shared";
import { applianceKey } from "@/src/utils/redis/keys/redisKeys";
import { applianceExpire } from "@/src/utils/redis/expiry/expireTime";

export const POST = isloggedin(async (req: NextRequest, user) => {
  try {
    const { id } = await req.json();
    const userId = user?.id;
    let redisApplianceData = null;

    if (!userId) {
      return NextResponse.json({ code: "PLEASE_LOGIN_AGAIN" }, { status: 401 });
    }

    try {
      redisApplianceData = await redis.get(applianceKey(userId));
    } catch (err) {
      console.error("Redis GET failed:", err);
    }

    await deleteAppliance(userId, id);
    if (redisApplianceData) {
      try {
        const appliance = JSON.parse(redisApplianceData);
        const updatedAppliances = appliance.filter(
          (app: applianceDbType) => app.id !== id,
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
    return NextResponse.json({ code: "DELETE_SUCESS" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { code: error.message || "SOMETHING_WRONG" },
      { status: 500 },
    );
  }
});
