import express from "express";
import cors from "cors";

import eventRoutes from "./src/routes/events.routes.js";
import participantsRouter from "./src/routes/participant.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/participants", participantsRouter);

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: `${message}` });
});

export default app;
