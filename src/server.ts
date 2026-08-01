import { createApp } from "./app.js";
import { authService, tokenService, userService } from "./container";
import { createWebSocketServer } from "./realtime/websocket.server";

const app = createApp({
  userService,
  authService,
  tokenService,
});

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

createWebSocketServer(server, tokenService);
