import { env } from "../../env.js";
import { createPrisma } from "./create-prisma.js";

export const prisma = createPrisma(env.database.url);
