"use server";
import { prisma } from "@/lib/prisma";

type energyProps = {
  houseHold: number;
  hasSolar: boolean;
  monthlyConsumption: string;
  userId: string;
};
export const createUserData = async ({
  houseHold,
  hasSolar,
  monthlyConsumption,
  userId,
}: energyProps) => {
  try {
    await prisma.userEnergyData.upsert({
      where: {
        userId,
      },
      create: {
        houseHold: houseHold,
        userId,
        hasSolar: hasSolar,
        monthlyConsumption,
      },
      update: {
        houseHold: houseHold,
        hasSolar: hasSolar,
        monthlyConsumption,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("SOMETHING_WENT_WRONG");
  }
};
