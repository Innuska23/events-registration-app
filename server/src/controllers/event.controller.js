import mongoose, { isValidObjectId } from "mongoose";

import controlWrapper from "../decorators/controlWrapper.js";
import Event from "../models/events.js";
import Participant from "../models/participant.js";

const getEvents = async (req, res) => {
  if (
    (req.query.field || req.query.direction) &&
    (!Object.keys(Event.schema.paths).includes(req.query.field) ||
      !(req.query.direction === "desc" || req.query.direction === "asc"))
  ) {
    throw HttpError(400, "Sort params invalid");
  }

  const offset = req.query.offset || 0;
  const limit = req.query.limit || 12;

  const countEvents = await Event.countDocuments();

  const events = req.query.field
    ? await Event.find()
        .sort({
          [req.query.field]: req.query.direction,
        })
        .skip(offset)
        .limit(limit)
    : await Event.find().skip(offset).limit(limit);

  if (!events) {
    throw HttpError(404, "Events not found");
  }

  return res.json({ count: countEvents, limit: 12, events });
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
