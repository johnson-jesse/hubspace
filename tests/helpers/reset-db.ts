import { prisma } from "./test-client.js";

export async function resetDatabase() {
  await prisma.user.deleteMany();
}
