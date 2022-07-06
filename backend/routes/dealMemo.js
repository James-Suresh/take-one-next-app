const express = require("express");
const router = express.Router();

// Import Controller
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
  createNewDealMemo,
  getAllDealMemos,
  updateDealMemo,
  deleteDealMemo,
} = require("../controllers/dealMemo");

// Import Validators

router.post("/dealmemo/create/new", createNewDealMemo);
router.get("/dealmemo/all", getAllDealMemos);
router.put("/dealmemo/update", updateDealMemo);
router.delete("/dealmemo/delete", deleteDealMemo);

module.exports = router;
