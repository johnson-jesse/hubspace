import { createPasswordHasher } from "./auth/password-hasher";
import { db } from "./db/connection";
import { createUserRepository } from "./repositories/user.repository";
import { createAuthService } from "./services/auth.service";
import { createJwtTokenService } from "./services/jwt-token.service";
import { createUserService } from "./services/user.service";

const userRepository = createUserRepository(db);
const passwordHasher = createPasswordHasher();
const tokenService = createJwtTokenService(process.env.JWT_SECRET);

export const userService = createUserService(userRepository, passwordHasher);

export const authService = createAuthService(
  userRepository,
  passwordHasher,
  tokenService,
);
