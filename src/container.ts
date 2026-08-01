import { createPasswordHasher } from "./auth/password-hasher";
import { env } from "./config/env";
import { db } from "./db/connection";
import { createUserRepository } from "./repositories/user.repository";
import { createAuthService } from "./services/auth.service";
import { createJwtTokenService } from "./services/jwt-token.service";
import { createUserService } from "./services/user.service";

const userRepository = createUserRepository(db);
const passwordHasher = createPasswordHasher();
const tokenService = createJwtTokenService(env.jwt.secret);

export const userService = createUserService(userRepository, passwordHasher);

export const authService = createAuthService(
  userRepository,
  passwordHasher,
  tokenService,
);
