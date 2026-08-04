import { createPasswordHasher } from "../../auth/password-hasher";
import { prisma } from "../prisma";

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
    name: "Jesse",
    email: "jesseajohnson@pm.me",
    password: "2345",
  },
];

async function seed() {
  for (const user of users) {
    const passwordHash = await passwordHasher.hash(user.password);

    const data = {
      name: user.name,
      email: user.email,
      passwordHash,
    };

    console.log(`\nSeeding user:`);
    console.table({
      ...data,
      passwordHash: "{removed}",
    });

    await prisma.user.create({ data });
  }

  await prisma.$disconnect();
}

seed().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
