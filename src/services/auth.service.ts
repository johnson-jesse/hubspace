import type { PasswordHasher } from "../auth/password-hasher.type";
import { AppError } from "../errors/app-errors";
import type { UserRepository } from "../repositories/user.repository.type";
import type { AuthService } from "./auth.service.type";
import type { TokenService } from "./token.type";

export function createAuthService(
  userRepository: UserRepository,
  passwordHasher: PasswordHasher,
  tokenService: TokenService,
): AuthService {
  return {
    async login(email, password) {
      const user = await userRepository.findUserForAuth(email);

      if (!user) {
        throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
      }

      const valid = await passwordHasher.verify(password, user.passwordHash);

      if (!valid) {
        throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
      }

      const token = tokenService.sign({
        userId: user.id,
        email: user.email,
      });

      return {
        token,
      };
    },
  };
}
