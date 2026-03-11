// src/server.ts
import express from "express";
import cors from "cors";

import apiRoutes from "./routes/api";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

// api routes
app.use("/api", apiRoutes);

export default app;
