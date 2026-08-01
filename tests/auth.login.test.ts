import { describe, expect, it } from "bun:test";
import request from "supertest";

import { createApp } from "../src/app";

import { createPasswordHasher } from "../src/auth/password-hasher";
import { createUserRepository } from "../src/repositories/user.repository";
import { createUserService } from "../src/services/user.service";
import { createTestDatabase } from "./helpers/database";

describe("POST /api/auth/login", () => {
  const db = createTestDatabase();

  const userRepository = createUserRepository(db);

  const passwordHasher = createPasswordHasher();

  const userService = createUserService(userRepository, passwordHasher);

  const app = createApp({
    userService,
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
