import { NextRequest, NextResponse } from "next/server";
import { getPriceDate } from "../../actions/priceDate/getPriceDate";

export const GET = async (req: NextRequest) => {
  const reqDate = req.nextUrl.searchParams.get("date");
  const fromDate = req.nextUrl.searchParams.get("fromDate");
  const toDate = req.nextUrl.searchParams.get("toDate");
  const priceData = await getPriceDate(reqDate, fromDate, toDate);
  return NextResponse.json(priceData);
};
