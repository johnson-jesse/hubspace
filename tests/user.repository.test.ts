import { expect } from "chai";
import { createTestApp } from "./helpers/test-app.ts";

describe("User Repository", () => {
  it("creates a user without exposing password hash", async () => {
    const { userRepository: repo } = createTestApp()

    const user = await repo.createUser(
      "Tester",
      "test@example.com",
      "$3dafkl328u5y",
    );

    expect(user.email).to.equal("test@example.com");
    expect(user).not.to.have.property("passwordHash");

    const found = await repo.findUserByEmail("test@example.com");

    expect(found?.id).to.equal(user.id);
    expect(found).not.to.have.property("passwordHash");
  });
});
