import { isloggedin } from "@/src/middleware/isLoggedin";
import { NextResponse } from "next/server";
import { getUserPrice } from "../../actions/priceDate/getUserPrice";
import { usePriceModel } from "../../actions/priceDate/usePriceModel";

export const GET = isloggedin(async (req: Request, user) => {
  try {
    const userId = user?.id;
    let predictedPrices: number[] = [];
    if (!userId) {
      return NextResponse.json({ message: "PLEASE_LOGIN" });
    }
    const user_past_price = await getUserPrice(userId);
    if (user_past_price?.hasData) {
      predictedPrices = await usePriceModel(user_past_price.Week_price);
    } else {
      predictedPrices = [0, 0, 0, 0, 0, 0, 0];
    }

    return NextResponse.json(predictedPrices);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "ERROR_FETCHING_USER_PRICE" });
  }
});
