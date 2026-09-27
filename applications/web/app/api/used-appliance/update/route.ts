import { NextRequest, NextResponse } from "next/server";
import { isloggedin } from "@/src/middleware/isLoggedin";
import { updateUsedAppliance } from "../../actions/usedAppliances/updateUsedAppliance";
import { redis } from "@/src/utils/redis/redisClient";
import { userUsedApplianceKey, userWeeklyConsumptionKey } from "@/src/utils/redis/keys/redisKeys";

export const POST = isloggedin(async (req, user) => {
  try {
    if (!user?.id) {
      return NextResponse.json({ code: "INVALID_USER" }, { status: 401 });
    }

    const body = await req.json();
    const { id, rating, usageHours, totalPrice } = body;
    
    if (!id || !rating || !usageHours || totalPrice === undefined) {
      return NextResponse.json({ code: "MISSING_FIELDS" }, { status: 400 });
    }

    const kwh = (Number(rating) * Number(usageHours)) / 1000;
    
    const updated = await updateUsedAppliance({
      id: Number(id),
      rating: Number(rating),
      hoursUsed: Number(usageHours),
      kwh,
      totalPrice: Number(totalPrice),
    });

    // Invalidate Redis caches
    try {
      const keysToDel = [
        userUsedApplianceKey(user.id, "today"),
        userWeeklyConsumptionKey(user.id),
      ];
      if (updated.date) {
        const formattedDate = new Date(updated.date).toISOString().split("T")[0];
        keysToDel.push(userUsedApplianceKey(user.id, formattedDate));
      }
      await Promise.all(
        keysToDel.map(async (key) => {
          try {
            await redis.del(key);
          } catch (delError) {
            console.error(`Error deleting key ${key} from Redis:`, delError);
          }
        })
      );
    } catch (redisError) {
      console.error("Redis invalidation error (used-appliance/update):", redisError);
    }
    
    return NextResponse.json({ code: "SUCCESS", data: updated }, { status: 200 });
  } catch (error) {
    console.error("Error in used-appliance update route:", error);
    return NextResponse.json({ code: "SOMETHING_WRONG" }, { status: 500 });
  }
});
