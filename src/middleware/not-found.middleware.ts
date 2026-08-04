import type { Request, Response } from "express";

export function notFoundMiddleware(_req: Request, res: Response) {
  console.log("UNHANDLED PATH:", _req.method, _req.path);
  res.status(404).json({
    error: "NOT_FOUND",
    message: "Route not found",
  });
}
