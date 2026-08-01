import type { PasswordHasher } from "../auth/password-hasher.type";
import { AppError } from "../errors/app-errors";
import type { UserRepository, UserService } from "../types/user.type";

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
    getUserById(id: number) {
      const user = userRepository.findUserById(id);

      if (!user) {
        throw new AppError("User not found", 404, "USER_NOT_FOUND");
      }

      return user;
    },
  };
}
