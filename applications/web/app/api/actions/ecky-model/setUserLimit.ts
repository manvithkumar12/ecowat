import { prisma } from "@/lib/prisma";

export const SetUserLimit = async (userId: string, value: number) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      limit: { increment: value },
      resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
  return user;
};
