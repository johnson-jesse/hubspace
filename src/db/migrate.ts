import { readFileSync } from "node:fs";
import { db } from "./connection";

const migration = readFileSync(
  new URL("./migrations/001_initial.sql", import.meta.url),
  "utf8"
);

db.run(migration);

console.log("Migration complete");