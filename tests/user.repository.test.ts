import { expect } from "chai";
import { createUserRepository } from "../src/repositories/user.repository.js";
import { createTestDatabase } from "./helpers/test-db.ts";

describe("User Repository", () => {
  it("creates a user", async () => {
    const db = createTestDatabase();

    const users = createUserRepository(db);

    const user = await users.createUser(
      "Tester",
      "test@example.com",
      "hashed_password",
    );

    expect(user.email).to.equal("test@example.com");

    const found = await users.findUserByEmail("test@example.com");

    expect(found?.id).to.equal(user.id);
  });
});
