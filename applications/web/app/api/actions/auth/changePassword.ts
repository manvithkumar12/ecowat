import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const changePassword = async (
  UserId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: UserId,
    },
    select: {
      password: true,
    },
  });
  if (!user?.password) {
    throw new Error("USER_NOT_FOUND");
  }
  const verify = await bcrypt.compare(oldPassword, user.password);
  if (!verify) {
    throw new Error("INVALID_OLD_PASSWORD");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: {
      id: UserId,
    },
    data: {
      password: hashedPassword,
    },
  });
  return {
    code: "PASSWORD_CHANGED",
  };
};
