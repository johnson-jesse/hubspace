import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

import { env } from "../config/env.ts";

mkdirSync(dirname(env.database.filename), {
  recursive: true
});

export const db = new Database(
  env.database.filename
);

db.run(`
  PRAGMA journal_mode = WAL;
`);