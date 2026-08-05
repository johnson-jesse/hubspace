import { expect } from "chai";
import request from "supertest";
import { createTestApp } from "./helpers/test-app.js";

describe("GET /health", () => {
  it("returns service health", async () => {
    const { app } = createTestApp();
    const response = await request(app).get("/health").expect(200);

    expect(response.body).to.deep.equal({
      status: "ok",
      service: "hubspace",
      version: "0.2.0",
    });
  });
});
