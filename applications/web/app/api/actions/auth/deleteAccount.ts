import { prisma } from "@/lib/prisma";

export const deleteAccount = async (userId: string) => {
  try {
    await prisma.$transaction(async (tx) => {
      // 1. Delete scheduled applications
      await tx.scheduledApplication.deleteMany({
        where: { userId },
      });

      // 2. Delete appliances linked to user's energy data
      const energyData = await tx.userEnergyData.findUnique({
        where: { userId },
        select: { id: true },
      });

      if (energyData) {
        await tx.appliance.deleteMany({
          where: { userDataId: energyData.id },
        });
        await tx.userEnergyData.delete({
          where: { id: energyData.id },
        });
      }

      // 3. Delete used appliances, daily usage, and predicted usage
      await tx.usedAppliance.deleteMany({
        where: { userId },
      });

      await tx.dailyUsage.deleteMany({
        where: { userId },
      });

      await tx.predictedUsage.deleteMany({
        where: { userId },
      });

      // 4. Finally delete the user record
      await tx.user.delete({
        where: { id: userId },
      });
    });

    return true;
  } catch (error) {
    console.error("Failed to delete user account:", error);
    throw new Error("FAILED_TO_DELETE");
  }
};
