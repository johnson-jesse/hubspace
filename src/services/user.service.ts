import type { PasswordHasher } from "../auth/password-hasher.type";
import { AppError } from "../errors/app-errors";
import type { UserRepository, UserService } from "../types/user.type";

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
  };
}
