import { Router } from "express";
import { createAuthController } from "../controllers/auth.controller";
import type { AppDependencies } from "../type";

export default function createAuthRoutes(dependencies: AppDependencies) {
  const router = Router();

  const controller = createAuthController(dependencies.userService);

  router.post("/register", controller.register);

  return router;
}
