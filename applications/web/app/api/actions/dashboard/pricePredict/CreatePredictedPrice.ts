import { prisma } from "@/lib/prisma";

interface PriceData {
  date: string;
  predictedPrice: number;
}

export const CreatePredictedPrice = async (priceData: PriceData[]) => {
  await Promise.all(
    priceData.map((item) =>
      prisma.weeklyPricePrediction.upsert({
        where: {
          date: item.date,
        },
        update: {
          price: item.predictedPrice,
        },
        create: {
          date: item.date,
          price: item.predictedPrice,
        },
      }),
    ),
  );
};
