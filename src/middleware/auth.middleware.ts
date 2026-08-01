import type { Request, Response, NextFunction } from "express";
import type { TokenService } from "../types/token.type.js";

export function createAuthMiddleware(tokenService: TokenService) {
  return function requireAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        error: "UNAUTHORIZED",
        message: "Authentication required",
      });
    }

    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        error: "UNAUTHORIZED",
        message: "Invalid authorization header",
      });
    }

    try {
      const payload = tokenService.verify(token);

      req.user = payload;

      next();
    } catch {
      return res.status(401).json({
        error: "UNAUTHORIZED",
        message: "Invalid token",
      });
    }
  };
}
