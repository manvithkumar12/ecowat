import { isloggedin } from "@/src/middleware/isLoggedin";
import { NextRequest, NextResponse } from "next/server";
import { createNewSchedule } from "../../actions/reschedule-appliance/createNewSchedule";
import { rescheduleAddType, getGermanDateString } from "@ecowat/shared";
import { redis } from "@/src/utils/redis/redisClient";
import { rescheduleApplianceKey } from "@/src/utils/redis/keys/redisKeys";
import { rescheduleApplianceExpire } from "@/src/utils/redis/expiry/expireTime";

export const POST = isloggedin(async (req, user) => {
  try {
    if (!user?.id) {
      return NextResponse.json({ message: "INVALID_USER" }, { status: 401 });
    }

    let redisData = null;
    try {
      redisData = await redis.get(rescheduleApplianceKey(user.id));
    } catch (redisError) {
      console.error("Redis GET error (schedule-appliances/add):", redisError);
    }

    const body = await req.json();

    const { applianceId, startHour, endHourHour, powerConsumed, rating } =
      body as rescheduleAddType;

    if (
      !applianceId ||
      startHour === undefined ||
      endHourHour === undefined ||
      powerConsumed === undefined ||
      rating === undefined
    ) {
      console.log(
        "res=====",
        `${applianceId};${startHour};${endHourHour};${powerConsumed};${rating}`,
      );
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields`,
        },
        { status: 400 },
      );
    }

    const schedule = await createNewSchedule(body, user.id);

    if (redisData) {
      try {
        const prevData = JSON.parse(redisData);

        const newData = {
          ...prevData,
          data: [...prevData.data, schedule],
        };

        await redis.set(
          rescheduleApplianceKey(user.id),
          JSON.stringify(newData),
          { EX: rescheduleApplianceExpire },
        );
      } catch (redisError) {
        console.error(
          "Redis update error (schedule-appliances/add):",
          redisError,
        );
      }
    }

    try {
      const todayDate = getGermanDateString();
      await redis.del(rescheduleApplianceKey(user.id));
    } catch (redisError) {
      console.error(
        "Redis invalidate error (schedule-appliances/add):",
        redisError,
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: schedule,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in POST /api/schedule-appliances/add:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add appliance schedule" },
      { status: 500 },
    );
  }
});
