import { isloggedin } from "@/src/middleware/isLoggedin";
import { deleteAccount } from "@/app/api/actions/auth/deleteAccount";
import { NextRequest, NextResponse } from "next/server";

export const POST = isloggedin(async (req: NextRequest, user) => {
  try {
    if (!user?.id) {
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    }
    const ReqStatus = await deleteAccount(user.id);
    if (!ReqStatus) {
      return NextResponse.json({ error: "FAILED_TO_DELETE" }, { status: 500 });
    }
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set("UserToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "SOMETHING_WENT_WRONG" },
      { status: 500 },
    );
  }
});
