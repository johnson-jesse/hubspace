import type { Database } from "bun:sqlite";

export interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

export function createUserRepository(db: Database) {
  return {
    createUser(email: string, passwordHash: string): User {
      const result = db
        .prepare(
          `
          INSERT INTO users (
            email,
            password_hash
          )
          VALUES (?, ?)
        `,
        )
        .run(email, passwordHash);

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
