import type { PasswordHasher } from "../auth/password-hasher.type";
import { AppError } from "../errors/app-errors";
import type { UserRepository } from "../repositories/user.type";
import type { UserService } from "./user.type";

export function createUserService(
  userRepository: UserRepository,
  passwordHasher: PasswordHasher,
): UserService {
  return {
    async registerUser(email: string, password: string) {
      const existingUser = userRepository.findUserByEmail(email);

      if (existingUser) {
        throw new AppError("User already exists", 409, "EMAIL_EXISTS");
      }

      const passwordHash = await passwordHasher.hash(password);

      return userRepository.createUser(email, passwordHash);
    },
  };
}
