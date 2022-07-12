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
    onboardingURL: {
      type: String,
      default: null,
    },
    dealMemoURL: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("deal_memos", dealMemoSchema);
