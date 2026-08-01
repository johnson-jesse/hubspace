import argon2 from "argon2";
import type { PasswordHasher } from "./password-hasher.type";

export function createPasswordHasher(): PasswordHasher {
  return {
    async hash(password: string) {
      return await argon2.hash(password);
    },

    async verify(password: string, hash: string) {
      return await argon2.verify(hash, password);
    },
  };
}
