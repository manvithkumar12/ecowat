import { prisma } from "@/lib/prisma";
import { getGermanNow } from "@ecowat/shared";

export const getHouseholdSize = async (userId: string) => {
  try {
    const month = getGermanNow().getMonth();
    const size = await prisma.userEnergyData.findUnique({
      where: { userId: userId },
      select: {
        houseHold: true,
      },
    });
    return { size: size?.houseHold, month };
  } catch (error) {
    console.log(error);
    throw new Error("SOMETHING_WRONG");
  }
};
