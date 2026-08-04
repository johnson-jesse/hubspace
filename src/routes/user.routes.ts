import { Router } from "express";
import { createAuthMiddleware } from "../middleware/auth.middleware";
import type { AppDependencies } from "../type";

export default function createUserRoutes(dependencies: AppDependencies) {
  const router = Router();

  const requireAuth = createAuthMiddleware(dependencies.tokenService);

  router.get("/me", requireAuth, async (req, res) => {
    const user = await dependencies.userService.getUserById(req.user!.userId);

    if (!user) {
      throw new Error("User not found");
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  });

  return router;
}
