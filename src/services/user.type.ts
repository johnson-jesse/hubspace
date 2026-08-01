import type { User } from "../repositories/user.repository";

export interface UserService {
  registerUser(
    email: string,
    password: string
  ): Promise<User>;
}