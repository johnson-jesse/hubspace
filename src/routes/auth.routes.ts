import { Router } from "express";
import { createAuthController } from "../controllers/auth.controller.js";
import type { AppDependencies } from "../types/type.js";

export default function createAuthRoutes(dependencies: AppDependencies) {
  const router = Router();

  const controller = createAuthController(dependencies.userService, dependencies.authService);

  router.post("/register", controller.register);
  router.post("/login", controller.login);
  return router;
}
