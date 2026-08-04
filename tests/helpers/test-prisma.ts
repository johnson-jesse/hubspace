import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client/client";
import { env } from "../../src/config/env";

export function createTestPrisma() {
  const adapter = new PrismaBetterSqlite3({
    url: env.database.url,
  });

  return new PrismaClient({
    adapter,
  });
}
