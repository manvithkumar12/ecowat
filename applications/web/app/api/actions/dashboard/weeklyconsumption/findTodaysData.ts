import { prisma } from "@/lib/prisma";
import { getGermanDayBounds } from "@ecowat/shared";

export const FindTodaysData = async () => {
  const { start, end } = getGermanDayBounds(new Date());

  const data = await prisma.dailyData.findFirst({
    where: {
      creationDate: {
        gte: start,
        lte: end,
      },
    },
  });

  if (data) {
    throw new Error("DATA_ALREADY_EXISTS");
  }

  return { code: "CONTINUE" };
};
