import { AppError } from "@/lib/utils/AppError.js";
import type { NextFunction, Request, Response } from "express";

export const handleError = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  console.error(err);

  if (!isOperational) {
    console.error("Non-operational error detected.");
    process.exit(1);
  }

  if (err.statusCode === 401) {
    res.clearCookie("session");
  }

  res.status(statusCode).json({
    message: isOperational ? err.message : "Something went wrong",
  });
};
