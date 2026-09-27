import { prisma } from "@/lib/prisma";
import { getGermanDateString, getGermanNow } from "@ecowat/shared";

export const fetchDailyData = async () => {
  const today = getGermanDateString(getGermanNow());
  const endDate = getGermanNow();
  endDate.setDate(endDate.getDate() + 6);
  const lastDay = getGermanDateString(endDate);
  try {
    const data = await prisma.dailyData.findMany({
      where: {
        date: {
          gte: today,
          lte: lastDay,
        },
      },
      orderBy: {
        date: "asc",
      },
      select: {
        date: true,
        tempMax: true,
        tempMin: true,
        dayOfWeek: true,
        renewabilityScore: true,
        wind: true,
        solar: true,
      },
    });
    return data;
  } catch (error) {
    throw new Error("UNABLE_TO_FETCH");
  }
};
