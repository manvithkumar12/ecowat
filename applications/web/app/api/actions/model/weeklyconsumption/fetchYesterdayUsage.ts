import { prisma } from "@/lib/prisma";

export const fetchYesterdayUsage = async (userId: string) => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const start = new Date(`${yesterdayStr}T00:00:00.000Z`);
  const end = new Date(`${yesterdayStr}T23:59:59.999Z`);

  try {
    const data = await prisma.dailyUsage.findFirst({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
    });
    return { hoursUsage: data?.usage ?? 0, kwUsed: data?.kwUsed ?? 0 };
  } catch (error) {
    console.log(error);
    throw new Error("SOMETHING_WRONG");
  }
};
