import type { Prisma, User } from "../../generated/prisma/client/client";
import type { PublicUser, UserFriends } from "../../shared/user";

export const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  color: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

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

  updateColor(id: number, color: string): Promise<PublicUser | null>;
  getFriends(id: number): Promise<UserFriends>;
}
