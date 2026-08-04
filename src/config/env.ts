export const env = {
  port: Number(process.env.PORT ?? 3000),

  database: {
    url: process.env.DATABASE_URL ?? "./data/hubspace.sqlite",
  },

  jwt: {
    secret: process.env.JWT_SECRET ?? "development-secret",
  },
};
