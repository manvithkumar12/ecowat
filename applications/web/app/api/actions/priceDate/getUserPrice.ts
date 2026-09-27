import { prisma } from "@/lib/prisma";

import { getGermanDateString, getGermanDayBounds } from "@ecowat/shared";

export const getUserPrice = async (userId: string) => {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  const { start: weekStarting } = getGermanDayBounds(
    new Date(Date.now() - 6 * MS_PER_DAY),
  );

  const { end: weekEnd } = getGermanDayBounds(new Date(Date.now()));

  const applianceData = await prisma.usedAppliance.findMany({
    where: {
      userId,
      date: {
        gte: weekStarting,
        lte: weekEnd,
      },
    },
    select: {
      date: true,
      totalPrice: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const groupedByDate = applianceData.reduce<Record<string, number>>(
    (acc, item) => {
      const dateKey = getGermanDateString(new Date(item.date));

      acc[dateKey] = (acc[dateKey] || 0) + item.totalPrice;

      return acc;
    },
    {},
  );

  const Week_price = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(Date.now() - (6 - index) * MS_PER_DAY);
    const dateKey = getGermanDateString(date);
    return Number((groupedByDate[dateKey] || 0).toFixed(2));
  });

  const hasData =
    applianceData.length > 0 &&
    applianceData.some((item) => item.totalPrice > 0);

  return {
    Week_price,
    hasData,
  };
};
