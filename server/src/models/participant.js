import mongoose, { Schema } from "mongoose";

const participantSchema = new Schema({
  fullName: String,
  email: String,
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
});

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
