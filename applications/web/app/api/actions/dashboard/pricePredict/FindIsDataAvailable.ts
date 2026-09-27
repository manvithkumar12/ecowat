import { prisma } from "@/lib/prisma";

import { getGermanDateString, getGermanDateParts } from "@ecowat/shared";

export const FindIsDataAvailable = async () => {
  const today = getGermanDateString();
  const parts = getGermanDateParts(today);
  const seventhDayDate = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + 7, 12, 0, 0),
  );
  const endDate = getGermanDateString(seventhDayDate);
  try {
    const IsAvailable = await prisma.weeklyPricePrediction.findMany({
      where: {
        date: { gte: today, lte: endDate },
      },
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        date: true,
        price: true,
      },
    });
    return {
      continue: IsAvailable.length < 7 ? true : false,
      data: IsAvailable.map((item) => ({
        id: item.id,
        date: item.date,
        predictedPrice: item.price,
        price: item.price,
      })),
    };
  } catch (error) {
    console.error(error);
    return { continue: true };
  }
};
