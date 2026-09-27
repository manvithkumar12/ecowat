import { NextResponse } from "next/server";
import { changeStatus } from "../../actions/appliances/changeStatus/changeStatus";
import { isloggedin } from "@/src/middleware/isLoggedin";
import { redis } from "@/src/utils/redis/redisClient";
import { applianceDbType } from "@ecowat/shared";
import { applianceKey } from "@/src/utils/redis/keys/redisKeys";
import { applianceExpire } from "@/src/utils/redis/expiry/expireTime";

export const POST = isloggedin(async (req: Request, user) => {
  try {
    const body = await req.json();
    const userId = user?.id;
    let redisData = null;
    const { id, status } = body;

    if (!userId) {
      return NextResponse.json({ code: "PLEASE_LOGIN_AGAIN" }, { status: 401 });
    }

    if (!id || status === undefined) {
      return NextResponse.json({ message: "MISSING_FIELDS" }, { status: 400 });
    }
    try {
      redisData = await redis.get(applianceKey(userId));
    } catch (err) {
      console.error("Redis GET failed:", err);
    }
    const updated = await changeStatus(id, status);

    if (redisData) {
      try {
        const appliances = JSON.parse(redisData) as applianceDbType[];
        const updatedAppliances = appliances.map((app: applianceDbType) =>
          app.id === id ? { ...app, status: updated.status } : app,
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
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({ code: "SOMETHING_WRONG" }, { status: 500 });
  }
});
