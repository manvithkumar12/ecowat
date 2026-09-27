"use server";

import { prisma } from "@/lib/prisma";

type UpdateUsedApplianceInput = {
  id: number;
  rating: number;
  hoursUsed: number;
  kwh: number;
  totalPrice: number;
};

export const updateUsedAppliance = async (input: UpdateUsedApplianceInput) => {
  try {
    return await prisma.usedAppliance.update({
      where: { id: input.id },
      data: {
        rating: input.rating,
        hoursUsed: Math.round(input.hoursUsed),
        kwh: input.kwh,
        totalPrice: input.totalPrice,
      },
    });
  } catch (error) {
    console.error("Error updating used appliance:", error);
    throw new Error("FAILED_TO_UPDATE_USED_APPLIANCE");
  }
};
