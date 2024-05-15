import mongoose from "mongoose";

import controlWrapper from "../decorators/controlWrapper.js";
import Participant from "../models/participant.js";
import Event from "../models/events.js";

const getParticipantsByEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    if (!mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({ message: `Invalid event id` });
    }

    const objectEventId = new mongoose.mongo.ObjectId(eventId);

    const event = await Event.findById(objectEventId);

    const participants = req.query.search
      ? await Participant.find({
          event: objectEventId,
          $or: [
            { fullName: { $regex: req.query.search } },
            { email: { $regex: req.query.search } },
          ],
        })
      : await Participant.find({ event: objectEventId });

    if (!participants || !event) {
      return res.status(404).json({ message: `Participants not found` });
    }

    return res.json({ event, participants });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};

const getParticipantsByEventStatistics = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const participants = await Participant.find({ event: eventId });
    const groupedData = {};

    participants.forEach((registration) => {
      const date = new Date(
        registration?.createdAt || Date.now()
      ).toLocaleDateString();
      groupedData[date] = (groupedData[date] || 0) + 1;
    });

    const values = Object.entries(groupedData).map(([date, participant]) => ({
      date,
      participant,
    }));

    res.json(values);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const participantsController = {
  getParticipantsByEvent: controlWrapper(getParticipantsByEvent),
  getParticipantsByEventStatistics: controlWrapper(
    getParticipantsByEventStatistics
  ),
};
