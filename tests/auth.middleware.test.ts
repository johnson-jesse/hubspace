import { describe, expect, it } from "bun:test";
import request from "supertest";
import { createTestApp } from "./helpers/create-test-app";

describe("Authentication middleware", () => {
  it("rejects requests without a token", async () => {
    const { app } = createTestApp();

    const response = await request(app).get("/api/users/me");

    expect(response.status).toBe(401);
  });
});
