import { describe, expect, it } from "bun:test";
import request from "supertest";
import { createTestApp } from "./helpers/create-test-app.js";

describe("POST /api/auth/me", () => {
  it("returns the current user", async () => {
    const { app } = createTestApp();

    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Tester",
        email: "test@example.com",
        password: "secret",
      })
      .expect(201);

    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "secret",
      })
      .expect(200);

    const response = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${login.body.token}`)
      .expect(200);

    expect(response.body.user.email).toBe("test@example.com");
  });
});
