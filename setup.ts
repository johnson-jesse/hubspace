import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const majorVersion = Number(process.versions.node.split(".")[0]);

if (majorVersion < 24) {
  console.warn(
    `⚠️ Node.js ${process.versions.node} detected. Hubspace recommends Node.js 24+.`,
  );
}

function createFile(path: string, content: string) {
  if (existsSync(path)) {
    console.log(`✓ ${path} already exists`);
    return;
  }

  writeFileSync(path, content);
  console.log(`✓ Created ${path}`);
}

mkdirSync("data", { recursive: true });

createFile(
  ".env",
  `DATABASE_URL="file:./data/hubspace.sqlite"
JWT_SECRET="development-secret-change-me"
PORT=3000
`,
);

createFile(
  ".env.test",
  `DATABASE_URL="file:./data/hubspace-test.sqlite"
JWT_SECRET="test-secret"
PORT=3001
`,
);

console.log("Setup complete.");
