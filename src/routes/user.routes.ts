import { Router } from "express";
import { createAuthMiddleware } from "../middleware/auth.middleware";
import type { AppDependencies } from "../type";
import { createUserController } from "../controllers/user.controller";

export default function createUserRoutes(dependencies: AppDependencies) {
  const router = Router();

  const requireAuth = createAuthMiddleware(dependencies.tokenService);
  const controller = createUserController(dependencies);

  router.get("/me", requireAuth, controller.getMe);
  router.patch("/me/color", requireAuth, controller.updateColor);
  router.get("/friends", requireAuth, controller.getFriends);

  return router;
}
