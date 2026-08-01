import jwt from "jsonwebtoken";
import type { TokenPayload, TokenService } from "../types/token.type.js";

export function createJwtTokenService(
  secret = "development-secret",
): TokenService {
  return {
    sign(payload: TokenPayload) {
      return jwt.sign(payload, secret, {
        expiresIn: "1h",
      });
    },

    verify(token: string): TokenPayload {
      const decoded = jwt.verify(token, secret);

      if (
        typeof decoded === "string" ||
        typeof decoded.userId !== "number" ||
        typeof decoded.email !== "string"
      ) {
        throw new Error("Invalid token payload");
      }

      return {
        userId: decoded.userId,
        email: decoded.email,
      };
    },
  };
}
