import { createDatabase } from "./database.js";

export const db = createDatabase(
  "data/nesws.sqlite"
);