import { AppError } from "../errors/app-errors";
import { createUser, findUserByEmail } from "../repositories/user.repository";

export function registerUser(email: string, passwordHash: string) {
  const existingUser = findUserByEmail(email);

  if (existingUser) {
    throw new AppError("User already exists", 409, "EMAIL_EXISTS");
  }

  return createUser(email, passwordHash);
}
