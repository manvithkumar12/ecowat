import { prisma } from "@/lib/prisma";
import { getGermanNow } from "@ecowat/shared";
import { SetUserLimit } from "./setUserLimit";

export const GetUserLimit = async (userId: string) => {
  const present = getGermanNow();
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      resetAt: true,
      limit: true,
    },
  });

  if (!user) {
    return { Allow: false, limit: 0 };
  }

  const currentLimit = user.limit ?? 0;
  const resetAt = user.resetAt;

  if (currentLimit < 30) {
    await SetUserLimit(userId, 1);
    return { Allow: true, limit: currentLimit + 1 };
  }

  if (currentLimit === 30) {
    if (resetAt && resetAt <= present) {
      await SetUserLimit(userId, -29);
      return { Allow: true, limit: 0 };
    }
    return { Allow: false, limit: currentLimit };
  }

  if (currentLimit >= 30) {
    return { Allow: false, limit: currentLimit };
  }

  return { Allow: false, limit: currentLimit };
};
