import { prisma } from "@/lib/prisma";
import { ApplianceUsage } from "@ecowat/shared";

const applianceMap: Record<string, keyof ApplianceUsage> = {
  evcharger: "evchargerHours",
  washingmachine: "washingmachineHours",
  dishwasher: "dishwasherHours",
  tumbledryer: "tumbledryerHours",
  electricwaterheater: "electricwaterheaterHours",
  heatpump: "heatpumpHours",
  airconditioner: "airconditionerHours",
  homebatterystorage: "homebatterystorageHours",
  electricfloorheating: "electricfloorheatingHours",
  chestfreezer: "chestfreezerHours",
  poolpump: "poolpumpHours",
  electricoven: "electricovenHours",
  clothesiron: "clothesironHours",
  dehumidifier: "dehumidifierHours",
  airpurifier: "airpurifierHours",
  saunaheater: "saunaheaterHours",
  spaceheater: "spaceheaterHours",
  electricboiler: "electricboilerHours",
  waterpump: "waterpumpHours",
} as const;

export const getUsersAppliance = async (
  userId: string,
): Promise<ApplianceUsage> => {
  try {
    const userDataId = await prisma.userEnergyData.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!userDataId) {
      throw new Error("NO_USER");
    }

    const appliancesData = await prisma.appliance.findMany({
      where: { userDataId: userDataId.id },
      select: {
        name: true,
        usageHours: true,
      },
    });

    const data = {} as ApplianceUsage;

    appliancesData.forEach((appliance) => {
      const featureName = applianceMap[appliance.name];

      if (featureName) {
        data[featureName] = appliance.usageHours;
      }
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("SOMETHING_WRONG");
  }
};
