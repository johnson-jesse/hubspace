import { readFileSync } from "node:fs";
import { db } from "../connection";

/**
 * TODO
 * 1) Get all migration files and loop
 * 2) Check for existence of a migration identifier within DB
 * 3) Skip or process migration
 * 4) Store migration identifier within DB
 * 5) Fail migration if necessary
 */
const migration = readFileSync(
  new URL("./migrations/001_initial.sql", import.meta.url),
  "utf8"
);

db.run(migration);

console.log("Migration complete");