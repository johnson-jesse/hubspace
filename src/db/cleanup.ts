import { db } from "./connection";

export function cleanupOldUsers() {
  const result = db.run(`
    DELETE FROM users
    WHERE datetime(created_at) < datetime('now', '-24 hours')
    AND email NOT IN (
      'jesse@fizzog.io',
      'jesseajohnson@pm.me'
    )
  `);

  console.log("Cleaned old users:", result.changes);
}
