export const env = {
  port: Number(process.env.PORT ?? 3000),

  database: {
    filename:
      process.env.DB_FILE ?? "./data/nesws.sqlite"
  }
};