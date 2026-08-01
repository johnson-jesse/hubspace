import { describe, expect, it } from "bun:test";
import request from "supertest";
import { createTestApp } from "./helpers/create-test-app";

describe("POST /api/auth/register", () => {
  const { app } = createTestApp();

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
