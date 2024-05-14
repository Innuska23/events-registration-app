import express from "express";
import { registrationController } from "../controllers/registration.controller.js";

const registrationRouter = express.Router({ strict: true });

registrationRouter.post("/", registrationController.registerForEvent);

export default registrationRouter;
