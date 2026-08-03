// import { Database } from "bun:sqlite";

// export function createTestDatabase() {
//   const db = new Database(":memory:");

//   db.run(`
//     CREATE TABLE users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       email TEXT NOT NULL UNIQUE,
//       password_hash TEXT NOT NULL,
//       created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
//     );
//   `);

//   return db;
// }

import { Database } from "bun:sqlite";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

let migrationSql: string | null = null;

function loadMigrations() {
  if (migrationSql) {
    return migrationSql;
  }

  const migrationsDir = join(process.cwd(), "src/db/migrations");

  const migrations = readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  migrationSql = migrations
    .map((file) => readFileSync(join(migrationsDir, file), "utf8"))
    .join("\n");

  return migrationSql;
}

export function createTestDatabase() {
  const db = new Database(":memory:");
  db.run(loadMigrations());
  return db;
}
