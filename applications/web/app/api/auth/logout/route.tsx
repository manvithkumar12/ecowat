import { NextResponse } from "next/server";

export const POST = (req: Request) => {
  try {
    const response = NextResponse.json({ code: "LOGGED_OUT" }, { status: 200 });
    response.cookies.delete("UserToken");
    return response;
  } catch {
    return NextResponse.json({ code: "SOMETHING_WENT_WRONG" }, { status: 500 });
  }
};
