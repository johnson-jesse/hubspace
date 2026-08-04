import type { PasswordHasher } from "../auth/password-hasher.type";
import { AppError } from "../errors/app-errors";
import type { AuthService } from "../types/auth.type";
import type { TokenService } from "../types/token.type";
import type { UserRepository } from "../types/user.type";

export function createAuthService(
  userRepository: UserRepository,
  passwordHasher: PasswordHasher,
  tokenService: TokenService,
): AuthService {
  return {
    async login(email, password) {
      const user = await userRepository.findUserByEmail(email);

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
