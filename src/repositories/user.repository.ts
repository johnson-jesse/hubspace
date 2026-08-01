import { db } from "../db/database";

export interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

export function createUser(email: string, passwordHash: string): User {
  const statement = db.prepare(`
    INSERT INTO users (
      email,
      password_hash
    )
    VALUES (?, ?)
  `);

  const result = statement.run(email, passwordHash);

  return findUserById(Number(result.lastInsertRowid))!;
}

export function findUserByEmail(email: string): User | undefined {
  const statement = db.prepare(`
    SELECT *
    FROM users
    WHERE email = ?
  `);

  return statement.get(email) as User | undefined;
}

export function findUserById(id: number): User | undefined {
  const statement = db.prepare(`
    SELECT *
    FROM users
    WHERE id = ?
  `);

  return statement.get(id) as User | undefined;
}
