import controlWrapper from "../decorators/controlWrapper.js";
import Participant from "../models/participant.js";

const getParticipants = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const participants = await Participant.find({ event: eventId }).populate(
      "event"
    );
    return res.json(participants);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};

export const participantsController = {
  getParticipants: controlWrapper(getParticipants),
};
