import { resetDatabase } from "./reset-db.js";
import { prisma } from "./test-client.js";

export const mochaHooks = {
  async beforeEach() {
    await resetDatabase();
  },

  async afterEach() {
    await prisma.$disconnect();
  },
};
