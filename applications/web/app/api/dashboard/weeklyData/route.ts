import { getRenewabilityForecast, weeklyTempratureApi } from "@ecowat/shared";
import { FindTodaysData } from "../../actions/dashboard/weeklyconsumption/findTodaysData";
import { deletePrevDays } from "../../actions/dashboard/weeklyconsumption/deletePrevDays";
import { CreateTodaysData } from "../../actions/dashboard/weeklyconsumption/createData";
import { NextResponse } from "next/server";
import { redis } from "@/src/utils/redis/redisClient";
import { weeklyConsumptionLock } from "@/src/utils/redis/keys/redisKeys";

export const POST = async () => {
  let hasLock = false;
  try {
    let lock = null;
    try {
      lock = await redis.set(weeklyConsumptionLock, "1", {
        NX: true,
        EX: 60,
      });
      if (lock) {
        hasLock = true;
      }
    } catch (redisError) {
      console.error("Redis lock acquisition error (weeklyData):", redisError);
      lock = "OK";
    }

    if (!lock) {
      return NextResponse.json({ code: "ALREADY_RUNNING" }, { status: 200 });
    }

    const FindIfAvailable = await FindTodaysData();

    if (FindIfAvailable.code === "CONTINUE") {
      const [TemperatureData, RenewableData] = await Promise.all([
        weeklyTempratureApi(),
        getRenewabilityForecast(),
      ]);

      await deletePrevDays();
      await CreateTodaysData(TemperatureData, RenewableData);

      return NextResponse.json({ code: "SUCCESS" }, { status: 200 });
    }

    return NextResponse.json({ code: "ALREADY_EXISTS" }, { status: 200 });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { code: error.message || "INTERNAL_ERROR" },
      { status: 500 },
    );
  } finally {
    if (hasLock) {
      try {
        await redis.del(weeklyConsumptionLock);
      } catch (redisError) {
        console.error("Redis lock deletion error (weeklyData):", redisError);
      }
    }
  }
};
