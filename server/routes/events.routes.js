import express from "express";
import { eventController } from "../controllers/event.controller.js";

const eventRouter = express.Router({ strict: true });

eventRouter.post("/", eventController.getEvents);

export default eventRouter;
