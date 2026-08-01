import { createDatabase } from "./database";

export const db = createDatabase(
  "data/nesws.sqlite"
);