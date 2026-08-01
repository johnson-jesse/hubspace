import express from "express";
import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/not-found.middleware";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "nesws",
    version: "0.1.0",
  });
});

app.use("/api/auth", authRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
