import type { Database } from "bun:sqlite";
import type { User, UserRepository } from "../types/user.type.js";

export function createUserRepository(db: Database): UserRepository {
  return {
    createUser(name: string, email: string, passwordHash: string): User {
      const result = db
        .prepare(
          `
          INSERT INTO users (
            name,
            email,
            password_hash
          )
          VALUES (?, ?, ?)
        `,
        )
        .run(name, email, passwordHash);

      return this.findUserById(Number(result.lastInsertRowid))!;
    },

    findUserByEmail(email: string): User | undefined {
      return db
        .query(
          `
          SELECT *
          FROM users
          WHERE email = ?
        `,
        )
        .get(email) as User | undefined;
    },

    findUserById(id: number): User | undefined {
      return db
        .query(
          `
          SELECT *
          FROM users
          WHERE id = ?
        `,
        )
        .get(id) as User | undefined;
    },
  };
}
