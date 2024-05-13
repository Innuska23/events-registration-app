import express from "express";
import cors from "cors";

import eventRoutes from "./routes/events.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: `${message}` });
});

export default app;
