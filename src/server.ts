import "dotenv/config";
import { createApp } from "./app.js";
import { env } from "../env.js";
import { authService, tokenService, userService } from "./container";
import { createWebSocketServer } from "./realtime/websocket.server";

const app = createApp({
  userService,
  authService,
  tokenService,
});

const server = app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

createWebSocketServer(server, tokenService);
