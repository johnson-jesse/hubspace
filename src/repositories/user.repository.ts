import type {
  PrismaClient,
  User,
} from "../../generated/prisma/client/client.ts";
import type { UserRepository } from "../types/user.type.ts";

export function createUserRepository(prisma: PrismaClient): UserRepository {
  return {
    createUser: function (
      name: string,
      email: string,
      passwordHash: string,
    ): Promise<User> {
      return prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      });
    },
    findUserByEmail: function (email: string): Promise<User | null> {
      return prisma.user.findUnique({
        where: { email },
      });
    },
    findUserById: function (id: number): Promise<User | null> {
      return prisma.user.findUnique({
        where: { id },
      });
    },
  };
}
