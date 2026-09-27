import { prisma } from "@/lib/prisma";
import {
  RenewableDay,
  DailyTemperature,
  getGermanDateParts,
  RenewableDayProps,
} from "@ecowat/shared";

export const CreateTodaysData = async (
  tempData: DailyTemperature[],
  renewableData: RenewableDayProps[],
) => {
  await Promise.all(
    tempData.map((temp, i) => {
      const parts = getGermanDateParts(temp.date);
      return prisma.dailyData.upsert({
        where: {
          date: temp.date,
        },
        create: {
          date: temp.date,
          tempMin: temp.tempMin,
          tempMax: temp.tempMax,
          dayOfWeek: parts.dayOfWeek,
          solar: renewableData[i].solar,
          wind: renewableData[i].wind,
          renewabilityScore: renewableData[i].renewablePercentage,
        },
        update: {
          tempMin: temp.tempMin,
          tempMax: temp.tempMax,
          dayOfWeek: parts.dayOfWeek,
          solar: renewableData[i].solar,
          wind: renewableData[i].wind,
          renewabilityScore: renewableData[i].renewablePercentage,
        },
      });
    }),
  );
};
