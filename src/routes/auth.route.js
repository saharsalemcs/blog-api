const express = require("express");
const validate = require("../middlewares/validate");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { registerRules, loginRules } = require("../validators/auth.validator");
const { protect } = require("../middlewares/auth");
const { uploadAvatar } = require("../middlewares/upload");

router
  .route("/register")
  .post(uploadAvatar, registerRules, validate, authController.register);

router.route("/login").post(loginRules, validate, authController.login);

router.route("/me").get(protect, authController.getMe);

module.exports = router;
