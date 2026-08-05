import "dotenv/config";
import { createPasswordHasher } from "../src/auth/password-hasher.js";
import { createPrisma } from "../src/db/create-prisma.js";

const prisma = createPrisma(process.env.DATABASE_URL!);

const passwordHasher = createPasswordHasher();

const users = [
  {
    name: "Fizzo",
    email: "jesse@fizzog.io",
    password: "1234",
  },
  {
    name: "Jesse",
    email: "jesseajohnson@pm.me",
    password: "2345",
  },
];

async function main() {
  for (const user of users) {
    const passwordHash = await passwordHasher.hash(user.password);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        passwordHash,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
