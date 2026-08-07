import type { Request, Response } from "express";
import type { AuthService } from "../services/auth.service.type";
import type { UserService } from "../services/user.service.type";

export function createAuthController(
  userService: UserService,
  authService: AuthService,
) {
  return {
    async register(req: Request, res: Response) {
      const { name, email, password } = req.body;
      const user = await userService.registerUser(name, email, password);

      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    },

    async login(req: Request, res: Response) {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    },
  };
}
