import { createApp } from "./app";
import { authService, userService } from "./container";

const app = createApp({
  userService,
  authService,
});

app.listen(3000, () => {
  console.log("Server running");
});
