const mongoose = require("mongoose");

const WhitelistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("whitelist_emails", WhitelistSchema);
