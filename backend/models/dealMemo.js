const mongoose = require("mongoose");

// User Schema
const dealMemoSchema = new mongoose.Schema(
  {
    showName: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    seasonStartDate: {
      type: String,
      required: true,
    },
    payrollEmail: {
      type: String,
      required: true,
    },
    payrollPhone: {
      type: String,
      required: true,
    },
    onboardingLink: {
      data: String,
      default: "",
    },
    dealMemoPdf: {
      data: String,
      default: "",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("deal_memos", dealMemoSchema);
