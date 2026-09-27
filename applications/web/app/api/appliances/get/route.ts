import { isloggedin } from "@/src/middleware/isLoggedin";
import { NextRequest, NextResponse } from "next/server";
import { getUserAppliances } from "../../actions/appliances/getAppliances/getAppliances";
import { redis } from "@/src/utils/redis/redisClient";
import { applianceKey } from "@/src/utils/redis/keys/redisKeys";
import { applianceExpire } from "@/src/utils/redis/expiry/expireTime";

export const GET = isloggedin(async (req: NextRequest, user) => {
  const paramsUrl = new URL(req.url).searchParams;
  const applianceNames = paramsUrl.getAll("applianceNames");

  const userId = user?.id;
  let cached = null;

  if (!userId) {
    return NextResponse.json({ code: "PLEASE_LOGIN_AGAIN" }, { status: 401 });
  }

  try {
    cached = await redis.get(applianceKey(userId));
  } catch (err) {
    console.error("Redis GET failed:", err);
  }
  if (cached) {
    const parsedData = JSON.parse(cached)
    if (applianceNames && applianceNames.length > 0) {
      return NextResponse.json({
        code: "SUCCESS",
        appliances: parsedData.filter((appliance: any) =>
          applianceNames.includes(appliance.name),
        ),
      });
    }
    return NextResponse.json({
      code: "SUCCESS",
      appliances: parsedData
    });
  }

  try {
    const appliances = await getUserAppliances(userId, applianceNames);
    if (!applianceNames || applianceNames.length === 0) {
      try {
        await redis.set(applianceKey(userId), JSON.stringify(appliances), {
          EX: applianceExpire,
        });
      } catch (err) {
        console.error("Redis SET failed:", err);
      }
    }
    return NextResponse.json({ code: "SUCCESS", appliances }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { code: error.message || "SOMETHING_ERROR" },
      { status: 500 },
    );
  }
});
