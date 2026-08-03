import { createPasswordHasher } from "../../auth/password-hasher";
import { db } from "../connection";

const passwordHasher = createPasswordHasher();

const users: {
  name: string;
  email: string;
  password: string;
}[] = [
  {
    name: "Fizzo",
    email: "jesse@fizzog.io",
    password: "1234",
  },
  {
    name: "Jesse Johnson",
    email: "jesseajohnson@pm.me",
    password: "2345",
  },
];

async function seed() {
  for (const user of users) {
    const passwordHash = await passwordHasher.hash(user.password);

    console.log(`Seeding ${user.name}, ${user.email}`);

    db.query(
      `
    INSERT INTO users (
      name,
      email,
      password_hash
    )
    VALUES (?, ?, ?)
  `,
    ).run(user.name, user.email, passwordHash);
  }
}

seed();
