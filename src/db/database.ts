import Database from "better-sqlite3";
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

  db.exec(`
    PRAGMA journal_mode = WAL;
  `);

  return db;
}
