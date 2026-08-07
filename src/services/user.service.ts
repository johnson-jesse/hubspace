import type { PasswordHasher } from "../auth/password-hasher.type";
import { AppError } from "../errors/app-errors";
import type { UserRepository } from "../repositories/user.repository.type";
import type { UserService } from "./user.service.type";

export function createUserService(
  userRepository: UserRepository,
  passwordHasher: PasswordHasher,
): UserService {
  return {
    async registerUser(name: string, email: string, password: string) {
      const existingUser = await userRepository.findUserByEmail(email);

      if (existingUser) {
        throw new AppError("User already exists", 409, "EMAIL_EXISTS");
      }

      const passwordHash = await passwordHasher.hash(password);
      return userRepository.createUser(name, email, passwordHash);
    },
    async getUserById(id: number) {
      const user = await userRepository.findUserById(id);

      if (!user) {
        throw new AppError("User not found", 404, "USER_NOT_FOUND");
      }

      return user;
    },
    async updateColor(id: number, color: string) {
      return await userRepository.updateColor(id, color);
    },
    async getUserFriends(id: number) {
      return await userRepository.getFriends(id);
    },
  };
}
