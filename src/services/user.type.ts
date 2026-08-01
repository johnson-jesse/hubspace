import type { User } from "../repositories/user.repository";

export interface UserService {
  registerUser(email: string, passwordHash: string): User;
}
