// const express = require("express");
// const mongoose = require("mongoose");
// const config = require("config");
// const eventRouter = require("./routes/events.routes");
// const app = express();
// const PORT = config.get("serverPort");

// const Event = require("./models/Events");

// app.use(express.json());
// app.use("/api/events", eventRouter);

// const start = async () => {
//   try {
//     await mongoose.connect(config.get("dbUrl"));

//     app.listen(PORT, () => {
//       console.log("Server started on port ", PORT);
//     });
//   } catch (e) {
//     console.error("Error starting server:", e.message);
//     process.exit(1);
//   }
// };

// start();

import mongoose from "mongoose";
import "dotenv/config";

import app from "./app.js";

const { DB_HOST, PORT = 5000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, (req) => {
      console.log(`Database connection successful. Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
