import { prisma } from "@/lib/prisma";
import { getGermanDateString, getGermanDateParts } from "@ecowat/shared";

export const findWeeklyConsumptionData = async (
  userId: string,
  fromDate?: string | null,
  toDate?: string | null,
) => {
  try {
    const todayStr = getGermanDateString();
    const parts = getGermanDateParts(todayStr);
    const seventhDayDate = new Date(
      Date.UTC(parts.year, parts.month - 1, parts.day + 7, 12, 0, 0),
    );
    const seventhDayStr = getGermanDateString(seventhDayDate);
    const predictions = await prisma.predictedUsage.findMany({
      where: {
        userId: userId,
        date: {
          gte: fromDate ?? todayStr,
          lte: toDate ?? seventhDayStr,
        },
      },
      orderBy: {
        date: "asc",
      },
      select: {
        date: true,
        predictedUsage: true,
      },
    });
    const isDateRangeRequested = fromDate || toDate;
    if (!isDateRangeRequested && predictions.length < 7) {
      return { code: "CONTINUE" };
    }
    return { data: predictions };
  } catch (error) {
    throw new Error("SOMETHING_WRONG");
  }
};
