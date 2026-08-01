import { db } from "./connection";

const tables = db
  .query(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
  `)
  .all();

console.log(tables);