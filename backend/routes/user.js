const express = require("express");
const router = express.Router();

// Import Controller
const {
  read,
  updateUserProfileOnboarding,
  updateUserAvatar,
  getAllUsers,
  getNumAdmins,
  getNumUsers,
  updateUserProfileAdmin,
  updateUserNotesAdmin,
  updateUserSettingsAccountTab,
  updateUserSettingsPersonalTab,
  updateUserSettingsWorkTab,
} = require("../controllers/user");
const { requireSignin, adminMiddleware } = require("../controllers/auth");

// Import Validators

router.get("/user/view/:id", requireSignin, read);
router.get("/user/:id", requireSignin, read);
router.get("/users/all", requireSignin, getAllUsers);
router.get("/users/admins", requireSignin, getNumAdmins);
router.get("/users/users", requireSignin, getNumUsers);
router.put("/user/update", requireSignin, updateUserProfileOnboarding);
router.put(
  "/user/update/settings/account-tab",
  requireSignin,
  updateUserSettingsAccountTab
);
router.put(
  "/user/update/settings/personal-tab",
  requireSignin,
  updateUserSettingsPersonalTab
);
router.put(
  "/user/update/settings/work-tab",
  requireSignin,
  updateUserSettingsWorkTab
);
router.put(
  "/user/update/admin",
  requireSignin,
  // adminMiddleware,
  updateUserProfileAdmin
);
router.put(
  "/user/update/admin/generalnotes",
  requireSignin,
  // adminMiddleware,
  updateUserNotesAdmin
);
router.put("/user/avatar/update", requireSignin, updateUserAvatar);

module.exports = router;

// user: lucasjcoder
// pass: DStM0j19cJqyBa0A
