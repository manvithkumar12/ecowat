"use server";
import { prisma } from "@/lib/prisma";

export const RegisterAccount = async (
  email: string,
  password: string,
  name: string,
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      isVerified: true,
    },
  });

  if (existingUser) {
    if (existingUser.isVerified) {
      throw new Error("USER_EXISTS");
    }
  }

  const createAccount = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      name,
    },
    create: {
      email,
      password,
      name,
    },
  });
  const wasExisting = !!existingUser;

  return {
    code: wasExisting ? "ACCOUNT_UPDATED" : "ACCOUNT_CREATED",
    user: {
      id: createAccount.id,
      email: createAccount.email,
      name: createAccount.name,
    },
  };
};
