import type { Request, Response } from "express";
import type { AppDependencies } from "../type";

export function createUserController(dependencies: AppDependencies) {
  return {
    async updateColor(req: Request, res: Response) {
      const { color } = req.body;

      const user = await dependencies.userService.updateColor(
        req.user!.userId,
        color,
      );

      res.json({ user });
    },

    async getMe(req: Request, res: Response) {
      const user = await dependencies.userService.getUserById(req.user!.userId);

      if (!user) {
        throw new Error("User not found");
      }

      res.json(user);
    },

    async getFriends(req: Request, res: Response) {
      const friends = await dependencies.userService.getUserFriends(
        req.user!.userId,
      );

      if (!friends) res.json([]);

      res.json(friends);
    },
  };
}
