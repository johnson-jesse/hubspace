import { expect } from "chai";
import request from "supertest";
import { createTestApp } from "./helpers/test-app.js";

describe("404 handling", () => {
  it("returns a consistent error response", async () => {
    const { app } = createTestApp();
    const response = await request(app).get("/api/does-not-exist").expect(404);

    expect(response.body).to.deep.equal({
      error: "NOT_FOUND",
      message: "Route not found",
    });
  });

  it("serves index.html for client routes", async () => {
    const { app } = createTestApp();

    const response = await request(app).get("/any_thing_else").expect(200);

    expect(response.headers["content-type"]).to.include("text/html");
    expect(response.text).to.include("<!doctype html>");
  });
});
