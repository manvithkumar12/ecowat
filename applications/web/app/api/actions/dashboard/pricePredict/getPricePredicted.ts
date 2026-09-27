import { prisma } from "@/lib/prisma";
import { getGermanDateParts, getGermanDateString } from "@ecowat/shared";

export const getPricePredicted = async (
  fromDate?: string | null,
  toDate?: string | null,
) => {
  const today = getGermanDateString();
  const parts = getGermanDateParts(today);
  const seventhDayDate = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + 7, 12, 0, 0),
  );
  const endDate = getGermanDateString(seventhDayDate);

  try {
    const data = await prisma.weeklyPricePrediction.findMany({
      where: {
        ...(fromDate && toDate
          ? {
              date: {
                gte: fromDate,
                lte: toDate,
              },
            }
          : {
              date: {
                gte: today,
                lte: endDate,
              },
            }),
      },
      select: {
        id: true,
        date: true,
        price: true,
      },
    });

    if (data.length === 0) {
      return {
        data: [],
        status: 400,
        error: "NO_DATA",
      };
    }

    return {
      data,
      status: 200,
    };
  } catch (error) {
    console.error(error);

    return {
      data: [],
      status: 500,
      error: "INTERNAL_SERVER_ERROR",
    };
  }
};
