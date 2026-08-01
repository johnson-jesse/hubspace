import { createApp } from "../../src/app";
import { createPasswordHasher } from "../../src/auth/password-hasher";
import { createUserRepository } from "../../src/repositories/user.repository";
import { createAuthService } from "../../src/services/auth.service";
import { createJwtTokenService } from "../../src/services/jwt-token.service";
import { createUserService } from "../../src/services/user.service";
import { createTestDatabase } from "./database";

export function createTestApp() {
  const db = createTestDatabase();
  const userRepository = createUserRepository(db);
  const passwordHasher = createPasswordHasher();
  const tokenService = createJwtTokenService("test-secret");
  const userService = createUserService(userRepository, passwordHasher);

  const authService = createAuthService(
    userRepository,
    passwordHasher,
    tokenService,
  );

  const app = createApp({
    userService,
    authService,
    tokenService,
  });

  return {
    app,
    db,
    userRepository,
    userService,
    authService,
    tokenService,
  };
}
