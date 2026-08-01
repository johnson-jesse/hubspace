import { Router } from "express";
import { createAuthMiddleware } from "../middleware/auth.middleware.js";
import type { AppDependencies } from "../types/type.js";

export default function createUserRoutes(dependencies: AppDependencies) {
  const router = Router();

  const requireAuth = createAuthMiddleware(dependencies.tokenService);

  router.get("/me", requireAuth, (req, res) => {
    const user = dependencies.userService.getUserById(req.user!.userId);

    res.json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  });

  return router;
}
