import { describe, it, expect } from "bun:test";
import request from "supertest";

import { createApp } from "../src/app";

const app = createApp();

describe("404 handling", () => {
  it("returns a consistent error response", async () => {
    const response = await request(app).get("/does-not-exist").expect(404);

    expect(response.body).toEqual({
      error: "NOT_FOUND",
      message: "Route not found",
    });
  });
});
