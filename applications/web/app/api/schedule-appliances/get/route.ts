import { isloggedin } from "@/src/middleware/isLoggedin";
import { FindUserReschedule } from "../../actions/reschedule-appliance/FindUserReschedule";
import { NextResponse } from "next/server";
import { redis } from "@/src/utils/redis/redisClient";
import { rescheduleApplianceKey } from "@/src/utils/redis/keys/redisKeys";
import { rescheduleApplianceExpire } from "@/src/utils/redis/expiry/expireTime";

export const GET = isloggedin(async (req, user) => {
  const startHour = req.nextUrl.searchParams.get("startHour");
  const endHour = req.nextUrl.searchParams.get("endHour");

  const applianceNames = req.nextUrl.searchParams.getAll("applianceNames").map(s => s.trim()).filter(Boolean);

  try {
    if (!user?.id) {
      return NextResponse.json({ message: "INVALID_USER" }, { status: 401 });
    }

    let redisData = null;

    try {
      redisData = await redis.get(rescheduleApplianceKey(user.id));
    } catch (redisError) {
      console.error("Redis GET error (schedule-appliances/get):", redisError);
    }

    if (redisData) {
      try {
        const cached = JSON.parse(redisData);

        let data = cached.data ?? cached ?? [];

        if (applianceNames.length > 0) {
          data = data.filter((app: any) =>
            applianceNames.includes(app.appliance?.name),
          );
        }

        if (startHour && endHour) {
          data = data.filter(
            (app: any) => app.startHour < endHour && app.endHour > startHour,
          );
        }

        return NextResponse.json({
          data,
          totalHours: data.reduce((total: number, app: any) => {
            const [start] = app.startHour.split(":").map(Number);

            const [end] = app.endHour.split(":").map(Number);

            return total + (end - start);
          }, 0),
        });
      } catch (parseError) {
        console.error("Redis data parse error:", parseError);
      }
    }

    const userReschedule = await FindUserReschedule(
      user.id,
      startHour,
      endHour,
      applianceNames
    );

    try {
      await redis.set(
        rescheduleApplianceKey(user.id),
        JSON.stringify(userReschedule),
        {
          EX: rescheduleApplianceExpire,
        },
      );
    } catch (redisError) {
      console.error("Redis SET error (schedule-appliances/get):", redisError);
    }
    console.log("dataa ", userReschedule);
    return NextResponse.json(userReschedule);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || error.error || "SOMETHING_WRONG",
      },
      { status: 400 },
    );
  }
});
