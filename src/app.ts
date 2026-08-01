import express from "express";
import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/not-found.middleware";
import createAuthRoutes from "./routes/auth.routes";
import type { AppDependencies } from "./types/type";
import createUserRoutes from "./routes/user.routes";

export function createApp(dependencies: AppDependencies) {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "nesws",
      version: "0.1.0",
    });
  });

  if (dependencies) {
    app.use("/api/auth", createAuthRoutes(dependencies));
    app.use("/api/users", createUserRoutes(dependencies));
  }

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
