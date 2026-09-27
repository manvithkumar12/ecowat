import { prisma } from "@/lib/prisma";
import { getGermanDateString } from "@ecowat/shared";

export const FindUserReschedule = async (
  userId: string,
  startHour?: string | null,
  endHour?: string | null,
  applianceNames?: string[],
) => {
  try {
    const date = getGermanDateString();
    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    const data = await prisma.scheduledApplication.findMany({
      where: {
        userId,

        date: {
          gte: startOfDay,
          lte: endOfDay,
        },

        ...(startHour && endHour
          ? {
              startHour: {
                lt: endHour,
              },
              endHour: {
                gt: startHour,
              },
            }
          : {}),

        ...(applianceNames && applianceNames.length > 0
          ? {
              appliance: {
                name: {
                  in: applianceNames,
                },
              },
            }
          : {}),
      },

      include: {
        appliance: {
          select: {
            name: true,
          },
        },
      },
    });
    const totalHours = data.reduce((total, app) => {
      const [startH, startM] = app.startHour.split(":").map(Number);

      const [endH, endM] = app.endHour.split(":").map(Number);

      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      return total + (endMinutes - startMinutes) / 60;
    }, 0);

    return {
      data,
      totalHours,
    };
  } catch (error) {
    console.error(error);
    throw new Error("SOMETHING_WRONG");
  }
};
