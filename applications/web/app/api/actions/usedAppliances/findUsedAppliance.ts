import { prisma } from "@/lib/prisma";

export const getUsedAppliances = async (
  userId: string,
  fromDate?: string,
  toDate?: string,
  applianceNames?: string[],
) => {
  const today = new Date().toISOString().split("T")[0];
  const startStr = fromDate || toDate || today;
  const endStr = toDate || fromDate || today;

  const startGte = new Date(`${startStr}T00:00:00.000Z`);
  const endLte = new Date(`${endStr}T23:59:59.999Z`);

  const applianceNameFilter =
    applianceNames && applianceNames.length > 0
      ? { in: applianceNames }
      : undefined;

  return await prisma.usedAppliance.findMany({
    where: {
      userId,
      date: {
        gte: startGte,
        lte: endLte,
      },
      ...(applianceNameFilter ? { applianceName: applianceNameFilter } : {}),
    },
    select: {
      id: true,
      applianceName: true,
      hoursUsed: true,
      kwh: true,
      rating: true,
      totalPrice: true,
      date: true,
    },
  });
};

export const getPast30DaysStats = async (userId: string) => {
  try {
    const end = new Date();
    const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

    const todayStr = end.toISOString().split("T")[0];
    const thirtyDaysAgoStr = start.toISOString().split("T")[0];

    const startGte = new Date(`${thirtyDaysAgoStr}T00:00:00.000Z`);
    const endLte = new Date(`${todayStr}T23:59:59.999Z`);

    const result = await prisma.usedAppliance.aggregate({
      where: {
        userId,
        date: {
          gte: startGte,
          lte: endLte,
        },
      },
      _sum: {
        totalPrice: true,
        kwh: true,
      },
    });

    const totalCost = result._sum.totalPrice ?? 0;
    const totalKwh = result._sum.kwh ?? 0;

    const savings = Math.max(0, totalKwh * 0.35 - totalCost);

    return {
      cost: totalCost,
      savings: savings,
    };
  } catch (error) {
    console.error("Error in getPast30DaysStats:", error);
    return { cost: 0, savings: 0 };
  }
};
