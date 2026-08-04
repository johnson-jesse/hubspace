import request from "supertest";
import { createTestApp } from "./helpers/create-test-app.js";
import { expect } from "chai";

describe("POST /api/auth/register", () => {
  const { app } = createTestApp();

  it("creates a user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Tester",
        email: "test@example.com",
        password: "secret",
      })
      .expect(201);

    expect(response.body.email).to.equal("test@example.com");
    expect(response.body.id).to.exist;
  });
});
