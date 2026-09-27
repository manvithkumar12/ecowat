"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const makeUserLogin = async (email: string, password: string) => {
  const Finduser = await prisma.user.findUnique({
    where: { email },
    include: { energyData: true },
  });
  if (!Finduser) {
    return { code: "USER_NOT_FOUND" };
  }
  if (!Finduser.isVerified) {
    return { code: "USER_NOT_VERIFIED" };
  }
  const isMatching = await bcrypt.compare(password, Finduser.password);
  if (isMatching) {
    return {
      code: "LOGIN_SUCCESS",
      data: {
        id: Finduser.id,
        username: Finduser.name,
        hasEnergyData: (Finduser.energyData?.length ?? 0) > 0,
      },
    };
  } else {
    return { code: "LOGIN_FAILED" };
  }
};
