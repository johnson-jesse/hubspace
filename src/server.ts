import { createApp } from "./app";
import { authService, tokenService, userService } from "./container";

const app = createApp({
  userService,
  authService,
  tokenService,
});

app.listen(3000, () => {
  console.log("Server running");
});
