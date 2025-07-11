import { NextFunction, Response } from "express";
import type { RequestType } from "../types/RequestType";
import { CustomError } from "../types/ErrorType";
import env from "../config/env";

const errorHandler = (
  err: any,
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  let message = "Internal Server Error";
  let statusCode = 500;

  if (err instanceof CustomError) {
    message = err.message;
    statusCode = err.statusCode;
  }

  if (env.NODE_ENV !== "production") {
    console.error(
      `Error: ${message} \nStack: ${err.stack || "No stack trace"}`
    );
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
