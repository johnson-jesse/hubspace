import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client/client.ts";
import { env } from "../../src/config/env.ts";

export function createTestDatabase() {
  const adapter = new PrismaBetterSqlite3({
    url: env.database.url,
  });

  return new PrismaClient({
    adapter,
  });
}
