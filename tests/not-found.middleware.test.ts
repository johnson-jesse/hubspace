import { expect } from "chai";
import request from "supertest";
import { createTestApp } from "./helpers/test-app.js";

describe("404 handling", () => {
  it("returns a consistent error response", async () => {
    const { app } = createTestApp();
    const response = await request(app).get("/does-not-exist").expect(404);

    expect(response.body).to.deep.equal({
      error: "NOT_FOUND",
      message: "Route not found",
    });
  });
});
