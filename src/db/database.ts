import { Database } from "bun:sqlite";

export function createDatabase(
  filename: string
) {
  const db = new Database(filename);

  db.run(`
    PRAGMA journal_mode = WAL;
  `);

  return db;
}