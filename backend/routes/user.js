const express = require("express");
const router = express.Router();

// Import Controller
const {
  read,
  updateUserProfile,
  updateUserAvatar,
  getAllUsers,
} = require("../controllers/user");
const { requireSignin, adminMiddleware } = require("../controllers/auth");

// Import Validators

router.get("/user/view/:id", requireSignin, read);
router.get("/user/:id", requireSignin, read);
router.get("/users/all", requireSignin, getAllUsers);
router.put("/user/update", requireSignin, updateUserProfile);
router.put("/admin/update", requireSignin, adminMiddleware, updateUserProfile);
router.put("/user/avatar/update", requireSignin, updateUserAvatar);

module.exports = router;

// user: lucasjcoder
// pass: DStM0j19cJqyBa0A
