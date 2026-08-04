import type { PublicUser } from "../repositories/model";

export interface UserService {
  registerUser(name: string, email: string, password: string): Promise<PublicUser>;
  getUserById(id: number): Promise<PublicUser>;
}
