import type { Request, Response } from "express";
import { cleanupOldUsers } from "../../db/cleanup";

export function cleanupCron(req: Request, res: Response) {
  const auth = req.headers.authorization;

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).send("Unauthorized");
    return;
  }

  cleanupOldUsers();

  res.json({
    status: "ok",
  });
}

// {
//   "crons": [
//     {
//       "path": "/api/cron/cleanup",
//       "schedule": "0 0 * * *"
//     }
//   ]
// }