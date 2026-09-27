import { isloggedin } from "@/src/middleware/isLoggedin";
import { NextResponse } from "next/server";
import { addAppliance } from "../../actions/appliances/addAppliance/addAppliance";
import { redis } from "@/src/utils/redis/redisClient";
import { applianceDbType } from "@ecowat/shared";
import { applianceKey } from "@/src/utils/redis/keys/redisKeys";
import { applianceExpire } from "@/src/utils/redis/expiry/expireTime";

export const POST = isloggedin(async (req, user) => {
  const body = await req.json();
  const { applianceName, rating, usage, status, startHour, endHour } = body;
  if (!applianceName || !rating || !usage || status === undefined) {
    return NextResponse.json({ message: "MISSING_FIELDS" }, { status: 400 });
  }
  if (!user?.id) {
    return NextResponse.json({ message: "INVALID_USER" }, { status: 401 });
  }

  let redisData = null;
  try {
    redisData = await redis.get(applianceKey(user.id));
  } catch (err) {
    console.error("Redis GET failed:", err);
  }

  try {
    const newAppliance = await addAppliance(
      user.id,
      applianceName,
      rating,
      usage,
      status,
    );
    if (redisData) {
      try {
        const appliances = JSON.parse(redisData) as applianceDbType[];
        const updatedAppliances = [...appliances, newAppliance];
        await redis.set(
          applianceKey(user.id),
          JSON.stringify(updatedAppliances),
          { EX: applianceExpire },
        );
      } catch (err) {
        console.error("Redis SET failed:", err);
      }
    }
    return NextResponse.json(
      { code: "APPLIANCE_ADDED", appliance: newAppliance },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ code: "FAILED_TO_ADD" }, { status: 500 });
  }
});
