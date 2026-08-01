import { createPasswordHasher } from "./auth/password-hasher.js";
import { env } from "./config/env.js";
import { db } from "./db/connection.js";
import { createUserRepository } from "./repositories/user.repository.js";
import { createAuthService } from "./services/auth.service.js";
import { createJwtTokenService } from "./services/jwt-token.service.js";
import { createUserService } from "./services/user.service.js";

const userRepository = createUserRepository(db);
const passwordHasher = createPasswordHasher();
export const tokenService = createJwtTokenService(env.jwt.secret);

export const userService = createUserService(userRepository, passwordHasher);

export const authService = createAuthService(
  userRepository,
  passwordHasher,
  tokenService,
);
