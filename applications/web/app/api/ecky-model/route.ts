import { isloggedin } from "@/src/middleware/isLoggedin";
import { NextResponse } from "next/server";
import { GetUserLimit } from "../actions/ecky-model/GetUserLimit";
import { SendToModel } from "../actions/ecky-model/SendToModel";

export const POST = isloggedin(async (req, user) => {
  if (!user) {
    return NextResponse.json({ message: "LOGIN_FIRST" }, { status: 401 });
  }

  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON request body" },
        { status: 400 },
      );
    }

    const { question } = body;
    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json(
        { error: "Question is required and must be a non-empty string" },
        { status: 400 },
      );
    }

    let User_limit;
    try {
      User_limit = await GetUserLimit(user.id);
    } catch (error) {
      console.error("Error retrieving user limit:", error);
      return NextResponse.json(
        { error: "Failed to verify request limits" },
        { status: 500 },
      );
    }

    if (!User_limit.Allow) {
      return NextResponse.json(
        { message: "LIMIT_EXCEEDED", limit: User_limit.limit },
        { status: 429 },
      );
    }

    try {
      const result = await SendToModel(user.id, question);
      return NextResponse.json(result);
    } catch (error: any) {
      console.error("Error communicating with AI model:", error);
      return NextResponse.json(
        { error: error?.message || "Failed to communicate with AI model" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Unexpected error in ecky-model route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
});
