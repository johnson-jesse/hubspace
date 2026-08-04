import type { PublicUser } from "../repositories/model";

export interface Actor {
  id: string;
  x: number;
  y: number;
  color: string;
  user: PublicUser;
}
