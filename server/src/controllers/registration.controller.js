import mongoose, { isValidObjectId } from "mongoose";
import controlWrapper from "../decorators/controlWrapper.js";
import Registration from "../models/registration.js";
import Event from "../models/events.js";

const registerForEvent = async (req, res) => {
  try {
    const { id, fullName, email, dateOfBirth, heardAboutEvent } = req.body;

    if (!isValidObjectId(id))
      return res.status(400).json({ message: `Invalid event id` });

    const eventId = new mongoose.mongo.ObjectId(id);
    const existEvent = await Event.findById(eventId);

    if (!existEvent)
      return res.status(400).json({ message: `Event not found` });

    const existingRegistration = await Registration.findOne({ email });

    if (existingRegistration) {
      return res
        .status(400)
        .json({ message: `User with email ${email} is already registered` });
    }

    const registration = new Registration({
      event: eventId,
      fullName,
      email,
      dateOfBirth,
      heardAboutEvent,
    });
    await registration.save();

    return res.json({ message: "Registration successful", registration });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};

export const registrationController = {
  registerForEvent: controlWrapper(registerForEvent),
};
