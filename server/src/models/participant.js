import mongoose, { Schema } from "mongoose";

const participantSchema = new Schema({
  fullName: String,
  email: String,
  dateOfBirth: Date,
  heardAboutEvent: String,
  event: { type: Schema.Types.ObjectId, ref: "Event" },
});

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
