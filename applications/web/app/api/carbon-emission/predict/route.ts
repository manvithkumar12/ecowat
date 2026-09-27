import { isloggedin } from "@/src/middleware/isLoggedin";
import { getCarbonData } from "../../actions/carbon-emission/getCarbonData";
import { getGermanDateString } from "@ecowat/shared";
import { NextRequest, NextResponse } from "next/server";
import { getCarbonModel } from "../../actions/carbon-emission/getModeldata";

export const GET = isloggedin(async (req: NextRequest, user) => {
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const end = new Date();
    const weekStart = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);

    const today = getGermanDateString(end);
    const weekStartDate = getGermanDateString(weekStart);

    const weeklyRecords = await getCarbonData(userId, weekStartDate, today);

    let carbonValues = weeklyRecords.map((r) => r.carbonEmission);

    while (carbonValues.length < 7) {
      carbonValues.unshift(0);
    }
    carbonValues = carbonValues.slice(-7);

    const prediction = await getCarbonModel(carbonValues);
    return NextResponse.json(
      {
        past7Days: carbonValues,
        predictedNext7Days: prediction?.predictions,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error predicting carbon emission:", error);
    return NextResponse.json({ code: "INTERNAL_ERROR" }, { status: 500 });
  }
});
