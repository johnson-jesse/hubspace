import { expect } from "chai";
import { describe } from "mocha";
import request from "supertest";
import { createTestApp } from "./helpers/create-test-app.js";

describe("POST /api/auth/login", () => {
  it("authenticates an existing user", async () => {
    const { app } = createTestApp();

    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Tester",
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

    expect(response.body.token).to.exist;
  });
});
