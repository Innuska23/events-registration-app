import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  _id: String,
  title: String,
  description: String,
  date: Date,
  organizer: String,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
