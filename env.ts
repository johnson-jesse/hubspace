function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }

  return value || '';
}

export const env = {
  port: Number(process.env.PORT ?? 3000),

  database: {
    url: requireEnv("DATABASE_URL"),
  },

  jwt: {
    secret: requireEnv("JWT_SECRET"),
  },
};
