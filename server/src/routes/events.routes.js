import express from "express";
import { eventController } from "../controllers/event.controller.js";

const eventRouter = express.Router({ strict: true });

eventRouter.get("/", eventController.getEvents);
eventRouter.post("/", eventController.createEvent);
// eventRouter.delete("/", eventController.deleteEvents);

export default eventRouter;
