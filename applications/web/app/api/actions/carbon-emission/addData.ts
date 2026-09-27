import { prisma } from "@/lib/prisma";
import { getGermanDateString, getGermanTime } from "@ecowat/shared";

interface CarbonIntensityRecord {
  timestamp: string;
  carbonIntensityGco2PerKwh: number;
}

export const addCarbonEmission = async (hourly: CarbonIntensityRecord[]) => {
  await prisma.carbonEmission.createMany({
    data: hourly.map((item) => {
      const startAt = new Date(item.timestamp);
      const stopAt = new Date(startAt.getTime() + 60 * 60 * 1000);

      return {
        date: getGermanDateString(startAt),
        timeStart: getGermanTime(startAt.getTime()),
        timeStop: getGermanTime(stopAt.getTime()),
        carbonIntensity: item.carbonIntensityGco2PerKwh,
      };
    }),
    skipDuplicates: true,
  });
};
