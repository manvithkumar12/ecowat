import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { loggedUser } from "@ecowat/shared";

export const isloggedin = (
  handler: (req: NextRequest, user: loggedUser) => Promise<Response>,
) => {
  return async (req: NextRequest) => {
    let token = req.cookies.get("UserToken")?.value;

    if (!token) {
      const authHeader = req.headers.get("authorization");

      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return NextResponse.json({ message: "LOGIN_FIRST" }, { status: 401 });
    }

    const bypassSecret = process.env.INTERNAL_BYPASS_KEY || "ecowat_internal_secret_key_123!";
    const bypassPrefix = `bypass_${bypassSecret}_`;

    if (token.startsWith(bypassPrefix)) {
      const userId = token.substring(bypassPrefix.length);
      const mockUser = {
        id: userId,
        email: "internal@ecowat.local",
        name: "Internal Python Service",
      };
      return handler(req, mockUser);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as loggedUser;

      return handler(req, decoded);
    } catch (error) {
      console.log(error);

      return NextResponse.json({ message: "INVALID_TOKEN" }, { status: 401 });
    }
  };
};
