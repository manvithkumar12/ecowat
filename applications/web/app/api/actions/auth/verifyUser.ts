"use server";

import { prisma } from "@/lib/prisma";

export const VerifyUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    return false;
  }
  if (user.isVerified) {
    return true;
  }
  await prisma.user.update({
    where: { email: email },
    data: {
      isVerified: true,
    },
  });

  return true;
};
