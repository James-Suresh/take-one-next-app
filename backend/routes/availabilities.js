const express = require("express");
const router = express.Router();

// Import Controller
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
  createAvalability,
  getAvalability,
  getAvalabilityAdmin,
  deleteAvalability,
  // deletePastAvalabilities,
} = require("../controllers/availabilities");

// Import Validators

router.post("/availabilities/create/new", requireSignin, createAvalability);
router.get("/availabilities/ofuser", requireSignin, getAvalability);
router.get("/availabilities/ofuser/:_id", requireSignin, getAvalabilityAdmin);
router.delete("/availabilities/:_id", deleteAvalability);
// router.delete("/availabilities/:_id", deletePastAvalabilities);
// router.put("/dealmemo/update", updateAvalability);

module.exports = router;
