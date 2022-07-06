const express = require("express");
const router = express.Router();

// Import Controller
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
  getWhitelistEmail,
  createWhitelistEmail,
  deleteWhitelistEmail,
} = require("../controllers/whitelist");

// Import Validators

router.get("/whitelist/:email", getWhitelistEmail);
router.post("/whitelist/email", createWhitelistEmail);
router.delete("/whitelist/:email", deleteWhitelistEmail);

module.exports = router;

// user: lucasjcoder
// pass: DStM0j19cJqyBa0A
