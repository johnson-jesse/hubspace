import { Database } from "bun:sqlite";
import fs from "fs";
import path from "path";

export function createDatabase(filename: string) {
  if (filename !== ":memory:") {
    const directory = path.dirname(filename);

    fs.mkdirSync(directory, {
      recursive: true,
    });
  }

  const db = new Database(filename);

  db.run(`
    PRAGMA journal_mode = WAL;
  `);

  return db;
}
