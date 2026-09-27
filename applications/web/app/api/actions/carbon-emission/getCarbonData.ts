import { prisma } from "@/lib/prisma";

interface DataResponse {
  date: string;
  usage: number;
  carbonEmission: number;
}

export const getCarbonData = async (
  userId: string,
  fromDate: string,
  toDate: string,
): Promise<DataResponse[]> => {
  try {
    const data = await prisma.usedAppliance.findMany({
      where: {
        userId,
        date: {
          gte: new Date(`${fromDate}T00:00:00.000Z`),
          lte: new Date(`${toDate}T23:59:59.999Z`),
        },
      },
      select: {
        date: true,
        kwh: true,
        carbonEmission: true,
      },
    });

    const dailyData = new Map<string, DataResponse>();

    for (const item of data) {
      const date = item.date.toISOString().split("T")[0];

      const current = dailyData.get(date) ?? {
        date,
        usage: 0,
        carbonEmission: 0,
      };

      current.usage += item.kwh;
      current.carbonEmission += item.carbonEmission ?? 0;

      dailyData.set(date, current);
    }

    return Array.from(dailyData.values())
      .map((item) => ({
        ...item,
        usage: Number(item.usage.toFixed(2)),
        carbonEmission: Number(item.carbonEmission.toFixed(2)),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error("Error in getCarbonData:", error);
    throw new Error("Failed to get carbon data");
  }
};
