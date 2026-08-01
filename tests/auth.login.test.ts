import { describe, expect, it } from "bun:test";
import request from "supertest";

import { createApp } from "../src/app";

import { createPasswordHasher } from "../src/auth/password-hasher";
import { createUserRepository } from "../src/repositories/user.repository";
import { createUserService } from "../src/services/user.service";
import { createTestDatabase } from "./helpers/database";
import { createAuthService } from "../src/services/auth.service";
import { createJwtTokenService } from "../src/services/jwt-token.service";

describe("POST /api/auth/login", () => {
  const db = createTestDatabase();

  const userRepository = createUserRepository(db);

  const passwordHasher = createPasswordHasher();
  const tokenService = createJwtTokenService(process.env.JWT_SECRET);

  const userService = createUserService(userRepository, passwordHasher);
  const authService = createAuthService(
    userRepository,
    passwordHasher,
    tokenService,
  );

  const app = createApp({
    userService,
    authService,
  });

  it("authenticates an existing user", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "secret",
      })
      .expect(201);

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "secret",
      })
      .expect(200);

    expect(response.body.token).toBeDefined();
  });
});
