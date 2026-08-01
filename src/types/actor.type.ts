import type { User } from "./user.type";

export interface Actor {
  id: string;
  x: number;
  y: number;
  color: string;
  user: User;
}
