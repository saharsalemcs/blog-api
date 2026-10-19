const express = require("express");
const userController = require("../controllers/user.controller");
const { param } = require("express-validator");
const { updateMeRules } = require("../validators/auth.validator");
const { validate } = require("../models/user.model");
const { protect, allowTo } = require("../middlewares/auth");

const router = express.Router();

const userIdRule = [param("userId").isMongoId().withMessage("invalid user id")];

router.use(protect);

router.route("/me").path(updateMeRules, validate, userController.updateMe);

router.route("/").get(allowTo("admin"), userController.getUsers);

router
  .route("/:userId")
  .get(restrictTo("admin"), userIdRule, validate, userController.getUser)
  .delete(restrictTo("admin"), userIdRule, validate, userController.deleteUser);

module.exports = router;
