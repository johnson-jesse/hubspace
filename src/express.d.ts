import type { TokenPayload } from "./services/token.type";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
