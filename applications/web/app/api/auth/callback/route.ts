import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VerifyUser } from "@/app/api/actions/auth/verifyUser";
import { createToken } from "@/src/utils/token/createToken";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export async function POST(req: Request) {
  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json(
        { code: "ACCESS_TOKEN_REQUIRED" },
        { status: 400 },
      );
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    if (error || !user?.email) {
      return NextResponse.json({ code: "INVALID_TOKEN" }, { status: 401 });
    }

    const verifyNewUser = await VerifyUser(user.email);

    if (!verifyNewUser) {
      return NextResponse.json({ code: "VERIFY_FAILED" }, { status: 400 });
    }

    const prismaUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!prismaUser) {
      return NextResponse.json({ code: "USER_NOT_FOUND" }, { status: 404 });
    }

    const token = createToken({
      id: prismaUser.id,
      email: prismaUser.email,
      name: prismaUser.name,
    });
    const response = NextResponse.json(
      {
        code: "SUCCESS",
      },
      { status: 200 },
    );
    response.cookies.set("UserToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        code: error instanceof Error ? error.message : "SOMETHING_WENT_WRONG",
      },
      { status: 500 },
    );
  }
}
