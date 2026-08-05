import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client/client";

export function createPrisma(databaseUrl: string) {
  const adapter = new PrismaBetterSqlite3({
    url: databaseUrl,
  });

  return new PrismaClient({
    adapter,
  });
}
