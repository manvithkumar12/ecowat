import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ code: "EMAIL_REQUIRED" }, { status: 400 });
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/en/auth/callback`,
      },
    });
    if (error) {
      return NextResponse.json({ code: error.message }, { status: 400 });
    }
    return NextResponse.json({ code: "MAGIC_LINK_SENT" }, { status: 200 });
  } catch {
    return NextResponse.json({ code: "SOMETHING_WENT_WRONG" }, { status: 500 });
  }
}
