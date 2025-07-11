import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import type { RequestType, UserPayload } from "../types/RequestType";
import env from "../config/env";
import { CustomError } from "../types/ErrorType";

const isAuthenticated = async (
  req: RequestType,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cookieToken = req.cookies?.auth_token;
    if (!cookieToken) {
      throw new CustomError("Unauthorized: No Token Found", 401);
    }

    const user: UserPayload = jwt.verify(
      cookieToken,
      env.JWT_SECRET
    ) as UserPayload;
    if (!user) {
      throw new CustomError("Unauthorized: Invalid or Expired Token", 403);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
