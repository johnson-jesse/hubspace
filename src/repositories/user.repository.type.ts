import type { Prisma, User } from "../../generated/prisma/client/client";

export const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  color: true,
  createdAt: true,
};

export type PublicUser = Prisma.UserGetPayload<{
  select: typeof publicUserSelect;
}>;

export interface UserRepository {
  createUser(
    name: string,
    email: string,
    passwordHash: string,
  ): Promise<PublicUser>;

  /**
   * Returns sensitive data. Not for general use
   */
  findUserForAuth(email: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<PublicUser | null>;
  findUserById(id: number): Promise<PublicUser | null>;
}
