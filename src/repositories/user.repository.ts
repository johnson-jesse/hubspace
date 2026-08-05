import type {
  PrismaClient,
  User,
} from "../../generated/prisma/client/client.ts";
import {
  publicUserSelect,
  type PublicUser,
  type UserRepository,
} from "./user.repository.type.ts";

export function createUserRepository(prisma: PrismaClient): UserRepository {
  return {
    createUser: function (
      name: string,
      email: string,
      passwordHash: string,
    ): Promise<PublicUser> {
      return prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
        select: publicUserSelect,
      });
    },
    findUserForAuth: function (email: string): Promise<User | null> {
      return prisma.user.findUnique({
        where: { email },
        /* RETURNING PASSWORD */
      });
    },
    findUserByEmail: function (email: string): Promise<PublicUser | null> {
      return prisma.user.findUnique({
        where: { email },
        select: publicUserSelect,
      });
    },
    findUserById: function (id: number): Promise<PublicUser | null> {
      return prisma.user.findUnique({
        where: { id },
        select: publicUserSelect,
      });
    },
    async updateColor(userId: number, color: string) {
      return prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          color,
        },
        select: publicUserSelect,
      });
    },
  };
}
