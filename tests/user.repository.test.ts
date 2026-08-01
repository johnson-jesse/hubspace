import { describe, it, expect } from "bun:test";
import { createTestDatabase } from "./helpers/database";
import { createUserRepository } from "../src/repositories/user.repository";

describe("User Repository", () => {
  it("creates a user", () => {
    const db = createTestDatabase();

    const users = createUserRepository(db);

    const user = users.createUser("test@example.com", "hashed_password");

    expect(user.email).toBe("test@example.com");

    const found = users.findUserByEmail("test@example.com");

    expect(found?.id).toBe(user.id);
  });
});
