import type { Request, Response } from "express";
import { AppError } from "../errors/app-errors";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response
) {

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.code,
      message: err.message
    });
  }

  console.error(err);

  return res.status(500).json({
    error: "INTERNAL_ERROR",
    message: "Something went wrong"
  });
}