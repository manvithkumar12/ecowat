import { prisma } from "@/lib/prisma";

export const AddPredictedData = async (
  userId: string,
  data: {
    date: string;
    predictedUsage: number;
  },
) => {
  return prisma.predictedUsage.upsert({
    where: {
      userId_date: {
        userId: userId,
        date: data.date,
      },
    },
    update: {
      predictedUsage: data.predictedUsage,
    },
    create: {
      userId: userId,
      date: data.date,
      predictedUsage: data.predictedUsage,
    },
  });
};
