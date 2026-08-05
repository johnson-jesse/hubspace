import { createPasswordHasher } from "./auth/password-hasher";
import { env } from "../env";
import { prisma } from "./db/prisma";
import { createUserRepository } from "./repositories/user.repository";
import { createAuthService } from "./services/auth.service";
import { createJwtTokenService } from "./services/jwt-token.service";
import { createUserService } from "./services/user.service";

const userRepository = createUserRepository(prisma);
const passwordHasher = createPasswordHasher();
export const tokenService = createJwtTokenService(env.jwt.secret);

export const userService = createUserService(userRepository, passwordHasher);

export const authService = createAuthService(
  userRepository,
  passwordHasher,
  tokenService,
);
