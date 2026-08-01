import { db } from "../db/connection.js";
import { createUserRepository } from "./user.repository.js";

export const userRepository = createUserRepository(db);