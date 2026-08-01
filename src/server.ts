import { createApp } from "./app";
import { userService } from "./container";

const app = createApp({
  userService,
});

app.listen(3000, () => {
  console.log("Server running");
});
