import { prisma } from "@/lib/prisma";
import { rescheduleAddType } from "@ecowat/shared";

export const createNewSchedule = async (
  obj: rescheduleAddType,
  userId: string,
) => {
  try {
    return await prisma.scheduledApplication.create({
      data: {
        userId,
        applianceId: obj.applianceId,
        startHour: obj.startHour,
        endHour: obj.endHourHour,
        powerConsumed: obj.powerConsumed,
        rating: obj.rating,
      },
      include: {
        appliance: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("SOMETHING_WRONG");
  }
};
