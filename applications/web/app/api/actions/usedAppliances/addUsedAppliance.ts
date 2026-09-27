"use server";

import { prisma } from "@/lib/prisma";

type AddUsedApplianceInput = {
  userId: string;
  applianceName: string;
  rating: number;
  hoursUsed: number;
  kwh: number;
  totalPrice: number;
  date?: Date;
  carbonEmission: number;
};

export const addUsedAppliance = async (input: AddUsedApplianceInput) => {
  try {
    if (input.carbonEmission === null) {
      console.error(
        " carbonEmission is not calculated , try adding at later time.",
      );
      throw new Error("FAILED_TO_CREATE_USED_APPLIANCE");
    }
    return await prisma.usedAppliance.create({
      data: {
        userId: input.userId,
        applianceName: input.applianceName,
        rating: input.rating,
        hoursUsed: Math.round(input.hoursUsed),
        kwh: input.kwh,
        totalPrice: input.totalPrice,
        date: input.date ?? new Date(),
        carbonEmission: input.carbonEmission,
      },
    });
  } catch (error) {
    console.error("Error creating used appliance:", error);
    throw new Error("FAILED_TO_CREATE_USED_APPLIANCE");
  }
};
