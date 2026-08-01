import type { PasswordHasher } from "../auth/password-hasher.type.js";
import { AppError } from "../errors/app-errors.js";
import type { UserRepository, UserService } from "../types/user.type.js";

export function createUserService(
  userRepository: UserRepository,
  passwordHasher: PasswordHasher,
): UserService {
  return {
    async registerUser(name: string, email: string, password: string) {
      const existingUser = userRepository.findUserByEmail(email);

      if (existingUser) {
        throw new AppError("User already exists", 409, "EMAIL_EXISTS");
      }

      const passwordHash = await passwordHasher.hash(password);

      return userRepository.createUser(name, email, passwordHash);
    },
    getUserById(id: number) {
      const user = userRepository.findUserById(id);

      if (!user) {
        throw new AppError("User not found", 404, "USER_NOT_FOUND");
      }

      return user;
    },
  };
}
