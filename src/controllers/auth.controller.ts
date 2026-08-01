import type { Request, Response } from "express";
import type { UserService } from "../services/user.type";

export function createAuthController(userService: UserService) {
  return {
    register(req: Request, res: Response) {
      const { email, password } = req.body;

      const user = userService.registerUser(email, password);

      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    },
  };
}
