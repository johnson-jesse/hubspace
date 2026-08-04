import express from "express";
import path from "path";
import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/not-found.middleware";
import createAuthRoutes from "./routes/auth.routes";
import createUserRoutes from "./routes/user.routes";
import type { AppDependencies } from "./type";

export function createApp(dependencies: AppDependencies) {
  const app = express();

  app.use(express.json());

  app.use(express.static(path.join(process.cwd(), "public")));

  app.get("/register", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "register.html"));
  });

  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "hubspace",
      version: "0.2.0",
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
