import { db } from "./db/connection";
import { createUserRepository } from "./repositories/user.repository";
import { createUserService } from "./services/user.service";

const userRepository = createUserRepository(db);
export const userService = createUserService(userRepository);
