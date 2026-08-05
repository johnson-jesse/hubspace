import request from "supertest";
import { createTestApp } from "./helpers/test-app.js";
import { expect } from "chai";

describe("Authentication middleware", () => {
  it("rejects requests without a token", async () => {
    const { app } = createTestApp();

    const response = await request(app).get("/api/users/me");

    expect(response.status).to.equal(401);
  });
});
