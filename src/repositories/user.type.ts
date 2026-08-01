import type { User } from "./user.repository";

export interface UserRepository {
  createUser(email: string, passwordHash: string): User;

  findUserByEmail(email: string): User | undefined;

  findUserById(id: number): User | undefined;
}
