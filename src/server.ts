import { createApp } from "./app";

const app = createApp({
  userService
});

app.listen(3000, () => {
  console.log("Server running");
});