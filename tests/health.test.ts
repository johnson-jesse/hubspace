import { describe, expect, it } from "bun:test";
import request from "supertest";
import { createTestApp } from "./helpers/create-test-app.js";

describe("GET /health", () => {
  it("returns service health", async () => {
    const { app } = createTestApp();
    const response = await request(app).get("/health").expect(200);

    expect(response.body).toEqual({
      status: "ok",
      service: "nesws",
      version: "0.1.0",
    });
  });
});
