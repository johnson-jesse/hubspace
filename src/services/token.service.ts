import jwt from "jsonwebtoken";
import type { TokenPayload, TokenService } from "../types/token.type.js";

export function createTokenService(
  secret = "development-secret",
): TokenService {
  return {
    sign(payload: TokenPayload) {
      return jwt.sign(payload, secret, {
        expiresIn: "1h",
      });
    },

    verify(token: string) {
      const payload = jwt.verify(token, secret);

      if (typeof payload === "string") {
        throw new Error("Invalid token payload");
      }

      return payload as TokenPayload;
    },
  };
}
