import express from "express";
import { participantsController } from "../controllers/participant.controller.js";

const participantsRouter = express.Router({ strict: true });

participantsRouter.get(
  "/:eventId",
  participantsController.getParticipantsByEvent
);

export default participantsRouter;
