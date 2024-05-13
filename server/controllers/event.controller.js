import controlWrapper from "../decorators/controlWrapper.js";

const getEvents = async (req, res) => {
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

export const eventController = { getEvents: controlWrapper(getEvents) };
