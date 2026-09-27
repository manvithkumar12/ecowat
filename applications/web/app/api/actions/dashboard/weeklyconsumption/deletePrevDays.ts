import { prisma } from "@/lib/prisma";

import { getGermanDateString } from "@ecowat/shared";

export const deletePrevDays = async () => {
  const today = getGermanDateString();

  await prisma.dailyData.deleteMany({
    where: {
      date: {
        lt: today,
      },
    },
  });
};
