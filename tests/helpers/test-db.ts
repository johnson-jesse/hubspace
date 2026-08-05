import { env } from "../../env.ts";
import { createPrisma } from "../../src/db/create-prisma.ts";

export function createTestPrisma() {
  return createPrisma(env.database.url);
}
