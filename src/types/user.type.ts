import type { User } from "../../generated/prisma/client/client.js";

export interface UserService {
  registerUser(name: string, email: string, password: string): Promise<User>;
  getUserById(id: number): Promise<User>;
}

export interface UserRepository {
  createUser(name: string, email: string, passwordHash: string): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
}
