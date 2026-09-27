import { RegisterAccount } from "@/app/api/actions/auth/register";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export const POST = async (req: Request) => {
  try {
    const { email, password, name } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const createNewAccount = await RegisterAccount(email, hashedPassword, name);
    if (createNewAccount.code === "ACCOUNT_UPDATED") {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/en/auth/callback`,
        },
      });
      if (error) {
        console.log(error);
        throw new Error("SUPABASE_ERROR");
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/en/auth/callback`,
          data: { name },
        },
      });
      if (error) {
        console.log(error);
        throw new Error("SUPABASE_ERROR");
      }
    }
    return NextResponse.json(
      {
        code: createNewAccount.code,
        user: createNewAccount.user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        code: error instanceof Error ? error.message : "SOMETHING_WRONG",
      },
      { status: 400 },
    );
  }
};
