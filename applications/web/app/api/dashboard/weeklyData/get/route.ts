import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const reqDate = request.nextUrl.searchParams.get("reqDate");

  const fromDate = request.nextUrl.searchParams.get("fromDate");
  const toDate = request.nextUrl.searchParams.get("toDate");

  const data = await prisma.dailyData.findMany({
    where: reqDate
      ? {
          date: reqDate,
        }
      : fromDate && toDate
        ? {
            date: {
              gte: fromDate,
              lte: toDate,
            },
          }
        : undefined,
    orderBy: {
      date: "asc",
    },
    select: {
      date: true,
      tempMin: true,
      tempMax: true,
      renewabilityScore: true,
      wind: true,
      dayOfWeek: true,
      solar: true,
    },
  });

  return NextResponse.json({ data });
};
