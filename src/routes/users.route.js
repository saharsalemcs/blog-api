const express = require("express");
const userController = require("../controllers/user.controller");
const { param } = require("express-validator");
const { updateMeRules } = require("../validators/auth.validator");
const { protect, allowTo } = require("../middlewares/auth");
const validate = require("../middlewares/validate");

const router = express.Router();

const userIdRule = [param("userId").isMongoId().withMessage("invalid user id")];

router.use(protect);

router.route("/me").patch(updateMeRules, validate, userController.updateMe);

router.route("/").get(allowTo("admin"), userController.getUsers);

router
  .route("/:userId")
  .get(allowTo("admin"), userIdRule, validate, userController.getUser)
  .delete(allowTo("admin"), userIdRule, validate, userController.deleteUser);

module.exports = router;
