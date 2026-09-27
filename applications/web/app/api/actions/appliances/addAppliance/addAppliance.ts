import { prisma } from "@/lib/prisma";

export const addAppliance = async (
  userId: string,
  applianceName: string,
  rating: number,
  usageHours: number,
  status: boolean,
) => {
  try {
    const userDataId = await prisma.userEnergyData.findUnique({
      where: { userId: userId },
      select: { id: true },
    });
    if (!userDataId) throw new Error("NOT_FOUND");
    const appliance = await prisma.appliance.findFirst({
      where: { userDataId: userDataId.id, name: applianceName },
    });
    if (appliance) throw new Error("ALREADY_EXISTS");
    const newApp = await prisma.appliance.create({
      data: {
        name: applianceName,
        power: rating,
        usageHours,
        status,
        kwh: Math.round((rating * usageHours) / 1000),
        userDataId: userDataId.id,
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
    return newApp;
  } catch (error) {
    console.log(error);
    throw new Error("SOMETHING_WRONG");
  }
};
