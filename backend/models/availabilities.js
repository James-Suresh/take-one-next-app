const mongoose = require("mongoose");

// User Schema
const AvailabilitiesSchema = new mongoose.Schema(
  {
    shift: {
      type: String,
      required: true,
      //   enum: ["AM", "PM", "AM/PM"],
      //   default: "AM",
    },
    availabilityDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    // every document should have create and update at
    // createdAt: {
    //   type: Schema.Types.Date,
    //   required: true,
    //   default: () => new Date(),
    // },
    // updatedAt: {
    //   type: Schema.Types.Date,
    //   required: true,
    //   default: () => new Date(),
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("availabilities", AvailabilitiesSchema);
