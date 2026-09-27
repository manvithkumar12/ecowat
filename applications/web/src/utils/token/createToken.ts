import jwt from "jsonwebtoken";
export const createToken = (payload: {
  id: string;
  email: string;
  name: string;
  hasEnergyId: boolean;
}) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
