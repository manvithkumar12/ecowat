import { prisma } from "@/lib/prisma";

export const changeStatus = async (id: number, applianceStatus: boolean) => {
  try {
    const updated = await prisma.appliance.update({
      where: { id },
      data: { status: !applianceStatus },
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
    console.log(error.message);
    throw new Error("SOMETHING_WRONG");
  }
};
