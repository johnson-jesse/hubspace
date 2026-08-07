import { expect } from "chai";
import { prisma } from "./helpers/test-client";

describe("database", () => {
  it("connects", async () => {
    const users = await prisma.user.findMany();

    expect(users).to.be.an("array");
  });
});
