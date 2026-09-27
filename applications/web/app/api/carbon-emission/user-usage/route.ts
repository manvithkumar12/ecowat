import { isloggedin } from "@/src/middleware/isLoggedin";
import { getCarbonData } from "../../actions/carbon-emission/getCarbonData";
import { getGermanDateString } from "@ecowat/shared";
import { NextRequest, NextResponse } from "next/server";

interface DataResponse {
  date: string;
  usage: number;
  carbonEmission: number;
}
export interface CarbonResponse {
  monthlyValue: number;
  weeklyData: DataResponse[];
  monthlyData: DataResponse[];
  weeklyValue: number;
}

export const GET = isloggedin(async (req: NextRequest, user) => {
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  }
  try {
    const end = new Date();
    const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    const weekStart = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);

    const today = getGermanDateString(end);
    const MonthStartDate = getGermanDateString(start);
    const WeekStartDate = getGermanDateString(weekStart);

    const carbonData = await getCarbonData(userId, MonthStartDate, today);

    const monthlyEmission = carbonData.reduce(
      (curr, next) => curr + next.carbonEmission,
      0,
    );
    const weeklyData = carbonData.filter((item) => item.date >= WeekStartDate);
    const weeklyEmission = weeklyData.reduce(
      (curr, next) => curr + next.carbonEmission,
      0,
    );
    return NextResponse.json(
      {
        monthlyValue: monthlyEmission,
        weeklyData: weeklyData,
        monthlyData: carbonData,
        weeklyValue: weeklyEmission,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ code: "INTERNAL_ERROR" }, { status: 500 });
  }
});
