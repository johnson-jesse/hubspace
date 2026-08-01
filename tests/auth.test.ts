import { describe, it, expect } from "bun:test";
import request from "supertest";

import { createApp } from "../src/app";

import { createTestDatabase } from "./helpers/database";
import { createUserRepository } from "../src/repositories/user.repository";
import { createUserService } from "../src/services/user.service";

describe("POST /api/auth/register", () => {
  const db = createTestDatabase();
  const userRepository = createUserRepository(db);
  const userService = createUserService(userRepository);

  const app = createApp({
    userService,
  });

  it("creates a user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "secret",
      })
      .expect(201);

    expect(response.body.email).toBe("test@example.com");
    expect(response.body.id).toBeDefined();
  });
});
