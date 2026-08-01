import type { User } from "../repositories/user.repository";

export interface UserService {
  registerUser(email: string, password: string): Promise<User>;
  getUserById(id: number): User;
}

export interface UserRepository {
  createUser(email: string, passwordHash: string): User;
  findUserByEmail(email: string): User | undefined;
  findUserById(id: number): User | undefined;
}
