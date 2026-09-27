import { isloggedin } from "@/src/middleware/isLoggedin";
import { NextResponse } from "next/server";
import { addUsedAppliance } from "../../actions/usedAppliances/addUsedAppliance";
import {
  userUsedApplianceKey,
  userWeeklyConsumptionKey,
} from "@/src/utils/redis/keys/redisKeys";
import { redis } from "@/src/utils/redis/redisClient";
import { getCarbonValue } from "../../actions/carbon-emission/getCarbonValue";
import { getGermanDateString } from "@ecowat/shared";

export const POST = isloggedin(async (req, user) => {
  try {
    const body = await req.json();
    const {
      applianceName,
      rating,
      usageHours,
      totalPrice,
      date,
      startHour,
      endHour,
    } = body;

    if (
      !applianceName ||
      !rating ||
      !usageHours ||
      totalPrice === undefined ||
      !startHour ||
      !endHour
    ) {
      return NextResponse.json({ message: "MISSING_FIELDS" }, { status: 400 });
    }

    if (!user?.id) {
      return NextResponse.json({ message: "INVALID_USER" }, { status: 401 });
    }

    const kwh = (Number(rating) * Number(usageHours)) / 1000;

    let parsedDate: Date | undefined = undefined;
    const targetDateStr = date || getGermanDateString(new Date());
    if (date) {
      parsedDate = new Date(date);
    }
    const carbonEmission = await getCarbonValue(
      targetDateStr,
      startHour,
      endHour,
    );
    const newUsedAppliance = await addUsedAppliance({
      userId: user.id,
      applianceName,
      rating: Number(rating),
      hoursUsed: Number(usageHours),
      kwh,
      totalPrice: Number(totalPrice),
      date: parsedDate,
      carbonEmission: carbonEmission ? Number(carbonEmission) * kwh : 0,
    });

    try {
      const keysToDel = [
        userUsedApplianceKey(user.id, date ?? "today"),
        userWeeklyConsumptionKey(user.id),
      ];
      if (date) {
        const formattedDate = getGermanDateString(new Date());
        keysToDel.push(userUsedApplianceKey(user.id, formattedDate));
      }
      await Promise.all(
        keysToDel.map(async (key) => {
          try {
            await redis.del(key);
          } catch (delError) {
            console.error(`Error deleting key ${key} from Redis:`, delError);
          }
        }),
      );
    } catch (redisError) {
      console.error(
        "Redis invalidation error (used-appliance/add):",
        redisError,
      );
    }

    return NextResponse.json(
      { code: "USED_APPLIANCE_ADDED", data: newUsedAppliance },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in used-appliance add route:", error);
    return NextResponse.json({ code: "FAILED_TO_ADD" }, { status: 500 });
  }
});
