import { prisma } from "@/lib/prisma";
import { getGermanDateString } from "@ecowat/shared";

export const getPriceDate = async (
  date?: string | null,
  fromDate?: string | null,
  toDate?: string | null,
) => {
  const targetDate = date || getGermanDateString();
  console.log("findingfor", {
    date: targetDate,
    fromDate,
    toDate,
  });
  return prisma.weeklyPricePrediction.findMany({
    where:
      fromDate && toDate
        ? {
            date: {
              gte: fromDate,
              lte: toDate,
            },
          }
        : {
            date: targetDate,
          },
  });
};

