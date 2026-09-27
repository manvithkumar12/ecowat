import { prisma } from "@/lib/prisma";

import { getGermanDateString, getGermanDateParts } from "@ecowat/shared";

export const getRenewableMacros = async () => {
  try {
    const today = getGermanDateString();
    const parts = getGermanDateParts(today);
    const seventhDayDate = new Date(
      Date.UTC(parts.year, parts.month - 1, parts.day + 7, 12, 0, 0),
    );
    const endDate = getGermanDateString(seventhDayDate);
    const data = await prisma.dailyData.findMany({
      where: {
        date: {
          gte: today,
          lte: endDate,
        },
      },
      select: {
        solar: true,
        wind: true,
        date: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("SOMETHING_WRONG");
  }
};
