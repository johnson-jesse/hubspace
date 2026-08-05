import { createApp } from "../../src/app.js";
import { createPasswordHasher } from "../../src/auth/password-hasher.js";
import { createUserRepository } from "../../src/repositories/user.repository.js";
import { createAuthService } from "../../src/services/auth.service.js";
import { createJwtTokenService } from "../../src/services/jwt-token.service.js";
import { createUserService } from "../../src/services/user.service.js";
import { createTestPrisma } from "./test-db.ts";

export function createTestApp() {
  const db = createTestPrisma();
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
