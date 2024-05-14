import mongoose, { isValidObjectId } from "mongoose";

import controlWrapper from "../decorators/controlWrapper.js";
import Event from "../models/events.js";
import Participant from "../models/participant.js";

const getEvents = async (req, res) => {
  const events = await Event.find();

  if (!events) {
    throw HttpError(404, "Events not found");
  }

  return res.json(events);
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, organizer } = req.body;

    const event = new Event({
      title,
      description,
      date: new Date(date),
      organizer,
    });
    await event.save();

    return res.json({ message: "Event was created", event });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};

const eventRegistration = async (req, res) => {
  try {
    const { id, fullName, email, dateOfBirth, heardAboutEvent } = req.body;

    if (!isValidObjectId(id))
      return res.status(400).json({ message: `Invalid event id` });

    const eventId = new mongoose.mongo.ObjectId(id);
    const existEvent = await Event.findById(eventId);

    if (!existEvent)
      return res.status(400).json({ message: `Event not found` });

    const existingParticipant = await Participant.findOne({ email });

    if (existingParticipant) {
      return res
        .status(400)
        .json({ message: `User with email ${email} is already registered` });
    }

    const registration = new Participant({
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

export const eventController = {
  getEvents: controlWrapper(getEvents),
  createEvent: controlWrapper(createEvent),
  eventRegistration: controlWrapper(eventRegistration),
};
