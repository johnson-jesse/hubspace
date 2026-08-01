import type { TokenPayload } from "../services/token.type.js";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
