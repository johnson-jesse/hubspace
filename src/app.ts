import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "nesws",
    version: "0.1.0",
  });
});

export default app;