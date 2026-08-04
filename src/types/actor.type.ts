import type { User } from "../../generated/prisma/client/client";

export interface Actor {
  id: string;
  x: number;
  y: number;
  color: string;
  user: User;
}
