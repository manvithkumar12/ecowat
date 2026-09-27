import { NextResponse } from "next/server";
import { makeUserLogin } from "../../actions/auth/login";
import { createToken } from "@/src/utils/token/createToken";
export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { code: "EMAIL_AND_PASSWORD_REQUIRED" },
        { status: 400 },
      );
    }
    const userLogin = await makeUserLogin(email, password);
    if (userLogin.code === "LOGIN_SUCCESS" && userLogin.data) {
      const UserToken = createToken({
        id: userLogin.data.id,
        email: email,
        name: userLogin.data.username,
        hasEnergyId: userLogin.data.hasEnergyData,
      });
      const response = NextResponse.json(
        { code: "LOGIN_SUCCESS", token: UserToken },
        { status: 200 },
      );
      response.cookies.set("UserToken", UserToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }
    return NextResponse.json({ code: userLogin.code }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ code: "SOMETHING_WENT_WRONG" }, { status: 500 });
  }
};
