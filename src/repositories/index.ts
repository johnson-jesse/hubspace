import { db } from "../db/connection";
import { createUserRepository } from "./user.repository";

export const userRepository = createUserRepository(db);