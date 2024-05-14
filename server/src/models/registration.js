import mongoose, { Schema } from "mongoose";

const registrationSchema = new Schema({
  fullName: String,
  email: String,
  dateOfBirth: Date,
  heardAboutEvent: String,
  event: { type: Schema.Types.ObjectId, ref: "Event" },
});

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
