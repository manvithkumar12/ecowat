import { NextResponse } from "next/server";
import { createUserData } from "../actions/appliances/energyData/postData";
import { isloggedin } from "@/src/middleware/isLoggedin";
import { createToken } from "@/src/utils/token/createToken";

export const POST = isloggedin(async (req, user) => {
  try {
    if (!user?.id) {
      return NextResponse.json({ message: "INVALID_USER" }, { status: 401 });
    }

    const body = await req.json();
    const { houseSize, monthlyConsumption, hasSolar } = body;
    if (
      houseSize === undefined ||
      monthlyConsumption === undefined ||
      hasSolar === undefined
    ) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }
    await createUserData({
      houseHold: houseSize,
      hasSolar,
      monthlyConsumption,
      userId: user.id,
    });

    const updatedToken = createToken({
      id: user.id,
      email: user.email,
      name: user.name,
      hasEnergyId: true,
    });

    const response = NextResponse.json(
      { code: "SUCESSFULL", token: updatedToken },
      { status: 200 },
    );

    response.cookies.set("UserToken", updatedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ code: "SOMETHING_WENT_WRONG" }, { status: 500 });
  }
});
