import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const getUserAppliances = async (
  userId: string,
  applianceNames?: string[],
) => {
  const userData = await prisma.userEnergyData.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!userData?.id) {
    throw new Error("NOT_FOUND");
  }
  const LoweredApplianceNames = applianceNames?.map((applianceName) =>
    applianceName.toLowerCase().replace(" ", ""),
  );
  try {
    const appliances = await prisma.appliance.findMany({
      where: {
        userDataId: userData.id,
        ...(LoweredApplianceNames &&
          LoweredApplianceNames.length > 0 && {
            name: { in: LoweredApplianceNames },
          }),
      },
      select: {
        name: true,
        power: true,
        usageHours: true,
        kwh: true,
        status: true,
        id: true,
      },
      orderBy: [{ status: "desc" }, { id: "desc" }],
    });
    return appliances;
  } catch {
    throw new Error("SOMETHING_WRONG");
  }
};
