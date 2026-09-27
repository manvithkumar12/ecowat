import { prisma } from "@/lib/prisma";

export type newData = {
  id: number;
  powerRatingW: number;
  dailyUsageHours: number;
  status: boolean;
};
export const updateAppliance = async (userId: string, data: newData) => {
  try {
    const appliance = await prisma.appliance.findFirst({
      where: {
        id: data.id,
        energyData: {
          userId,
        },
      },
    });

    if (!appliance) {
      throw new Error("UNAUTHORIZED");
    }

    const updated = await prisma.appliance.update({
      where: { id: data.id },
      data: {
        power: data.powerRatingW,
        usageHours: data.dailyUsageHours,
        status: data.status,
        kwh: Math.round((data.powerRatingW * data.dailyUsageHours) / 1000),
      },
      select: {
        id: true,
        name: true,
        power: true,
        usageHours: true,
        kwh: true,
        status: true,
      },
    });
    return updated;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message === "UNAUTHORIZED" ? "UNAUTHORIZED" : "SOMETHING_WRONG");
  }
};
