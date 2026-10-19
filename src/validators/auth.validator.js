const { body } = require("express-validator");

const registerRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("name must be at least 2 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("email is not valid")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
];

const loginRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("email is not valid")
    .normalizeEmail(),
  body("password").trim().notEmpty().withMessage("password is required"),
];

const updateMeRules = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("name must be at least 2 characters"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("email is not valid")
    .normalizeEmail(),
];

module.exports = { registerRules, loginRules };
