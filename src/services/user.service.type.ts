import type { PublicUser, UserFriends } from "../../shared/user";

export interface UserService {
  registerUser(
    name: string,
    email: string,
    password: string,
  ): Promise<PublicUser>;
  getUserById(id: number): Promise<PublicUser>;
  updateColor(id: number, color: string): Promise<PublicUser | null>;
  getUserFriends(id: number): Promise<UserFriends>;
}
