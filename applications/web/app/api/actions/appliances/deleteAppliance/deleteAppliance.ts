import { prisma } from "@/lib/prisma";

export const deleteAppliance = async (userId: string, id: number) => {
  try {
    const userDataId = await prisma.userEnergyData.findUnique({
      where: { userId: userId },
    });

    if (!userDataId) throw new Error("UNAUTHORIZED");

    const appliance = await prisma.appliance.findFirst({
      where: { id, userDataId: userDataId.id },
    });
    if (!appliance) throw new Error("UNAUTHORIZED");

    const deleted = await prisma.appliance.delete({
      where: { id },
    });
    return deleted;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message === "UNAUTHORIZED" ? "UNAUTHORIZED" : "SOMETHING_WRONG",
    );
  }
};
