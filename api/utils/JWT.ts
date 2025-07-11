import { UserPayload } from "api/types/RequestType";
import { Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";

const cookieOptions = {
  httpOnly: true,
  sameSite: "strict" as "strict",
  secure: process.env.NODE_ENV === "production",
  maxAge: 3600,
};

export const setJWT = async (user: UserPayload, res: Response) => {
  const token = jwt.sign(user, env.JWT_SECRET, { expiresIn: 3600 });
  res.cookie("auth_token", token, cookieOptions);
};

export const clearJWT = async (res: Response) => {
  res.clearCookie("auth_token", { ...cookieOptions, maxAge: 0 });
};
