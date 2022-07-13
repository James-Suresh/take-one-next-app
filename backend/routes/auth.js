const express = require("express");
const router = express.Router();

// Import Controller
const {
  signup,
  accountActivation,
  signin,
  getUserToken,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

// Import Validators
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/account-activation", accountActivation);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/get-user-token", getUserToken);
// forgot password reset route
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);

module.exports = router; // {}

// user: lucasjcoder
// pass: DStM0j19cJqyBa0A
