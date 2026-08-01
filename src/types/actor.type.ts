import type { TokenPayload } from "./token.type";

export interface Actor {
  id: string;
  x: number;
  y: number;
  color: string;
  token: TokenPayload;
}
