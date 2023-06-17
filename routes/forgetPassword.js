const express = require("express");
const router = express.Router();
const ForgetPasswordController = require("../controllers/forget_password_controller");
const passport = require("passport");

router.get("/", ForgetPasswordController.forgetPassword);
router.post(
  "/send_dummy_password",
  ForgetPasswordController.send_dummy_password
);

module.exports = router;
