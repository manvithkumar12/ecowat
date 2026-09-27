import { prisma } from "@/lib/prisma";

export const replacePredictions = async (
  userId: string,
  predictions: {
    date: string;
    predictedUsage: number;
  }[],
) => {
  await prisma.predictedUsage.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.predictedUsage.createMany({
    data: predictions.map((prediction) => ({
      userId,
      date: prediction.date,
      predictedUsage: prediction.predictedUsage,
    })),
  });
};
