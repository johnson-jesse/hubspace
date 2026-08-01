import { db } from "./connection";

const tables = db
  .query(
    `
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
  `,
  )
  .all();

console.log(tables);
console.log(
  db
    .query(
      `
    SELECT id, email, password_hash
    FROM users
  `,
    )
    .all(),
);
