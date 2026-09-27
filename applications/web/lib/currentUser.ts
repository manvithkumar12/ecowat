"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUser = async () => {
  const cookiestore = await cookies();
  const token = cookiestore.get("UserToken")?.value;
  if (!token) return null;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      id: string;
      email: string;
      name: string;
      hasEnergyId: boolean;
    };
    return {
      id: decode.id,
      email: decode.email,
      name: decode.name,
      hasEnergyId: decode.hasEnergyId,
    };
  } catch (err) {
    return null;
  }
};
