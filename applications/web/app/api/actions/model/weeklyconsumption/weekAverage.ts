import { prisma } from "@/lib/prisma";
import { getGermanDayBounds } from "@ecowat/shared";

export const weekAverageData = async (userId: string) => {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 6);

  const { start: startGte } = getGermanDayBounds(startDate);
  const { end: endLte } = getGermanDayBounds(today);

  try {
    const data = await prisma.dailyUsage.findMany({
      where: {
        userId,
        date: {
          gte: startGte,
          lte: endLte,
        },
      },
      select: {
        usage: true,
      },
    });

    if (data.length === 0) return { avgLast7Days: 0 };

    const totalUsage = data.reduce((acc, item) => acc + item.usage, 0);
    const avgLast7Days = totalUsage / data.length;

    console.log("AVG&DAYS", avgLast7Days);
    return { avgLast7Days };
  } catch (error) {
    console.log(error);
    throw new Error("SOMETHING_WRONG");
  }
};
