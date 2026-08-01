import { describe, expect, it } from "bun:test";
import request from "supertest";
import { createTestApp } from "./helpers/create-test-app";

describe("404 handling", () => {
  it("returns a consistent error response", async () => {
    const { app } = createTestApp();
    const response = await request(app).get("/does-not-exist").expect(404);

    expect(response.body).toEqual({
      error: "NOT_FOUND",
      message: "Route not found",
    });
  });
});
