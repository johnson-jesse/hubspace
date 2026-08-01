import type { PasswordHasher } from "../auth/password-hasher.type.js";
import { AppError } from "../errors/app-errors.js";
import type { AuthService } from "../types/auth.type.js";
import type { TokenService } from "../types/token.type.js";
import type { UserRepository } from "../types/user.type.js";

export function createAuthService(
  userRepository: UserRepository,
  passwordHasher: PasswordHasher,
  tokenService: TokenService,
): AuthService {
  return {
    async login(email, password) {
      const user = userRepository.findUserByEmail(email);

      if (!user) {
        throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
      }

      const valid = await passwordHasher.verify(password, user.password_hash);

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
