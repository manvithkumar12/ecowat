import { NextRequest, NextResponse } from "next/server";
import { changePassword } from "../../actions/auth/changePassword";
import { isloggedin } from "@/src/middleware/isLoggedin";

export const POST = isloggedin(async (req: NextRequest, user) => {
  try {
    const body = await req.json();
    const { oldPassword, newPassword } = body;

    if (!user?.id) {
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    }

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    const requestStatus = await changePassword(
      user.id,
      oldPassword,
      newPassword,
    );

    return NextResponse.json({ code: requestStatus?.code }, { status: 200 });
  } catch (error: any) {

    if (error.message === "USER_NOT_FOUND") {
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    }
    if (error.message === "INVALID_OLD_PASSWORD") {
      return NextResponse.json(
        { error: "INVALID_OLD_PASSWORD" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "SOMETHING_WENT_WRONG" },
      { status: 500 },
    );
  }
});
