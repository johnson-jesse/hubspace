import { AppError } from "../errors/app-errors";
import { userRepository } from "../repositories";
import type { UserService } from "./user.type";

export function createUserService(): UserService {
  return {
    registerUser(email: string, passwordHash: string) {
      const existingUser = userRepository.findUserByEmail(email);

      if (existingUser) {
        throw new AppError("User already exists", 409, "EMAIL_EXISTS");
      }

      return userRepository.createUser(email, passwordHash);
    },
  };
}
