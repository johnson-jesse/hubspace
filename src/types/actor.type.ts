import type { TokenPayload } from "./token.type.js";

export interface Actor {
  id: string;
  x: number;
  y: number;
  color: string;
  token: TokenPayload;
}
