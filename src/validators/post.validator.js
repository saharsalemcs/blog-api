const { body, param, query } = require("express-validator");

const STATUSES = ["draft", "published"];

const createPostRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters"),

  body("content").trim().notEmpty().withMessage("content is required"),

  body("status")
    .optional()
    .isIn(STATUSES)
    .withMessage("status must be draft or published"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("tags must be an array")
    .bail()
    .custom((tags) => tags.every((t) => typeof t === "string"))
    .withMessage("each tag must be a string"),

  body("coverImage")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("coverImage must be a valid URL"),
];

const updatePostRules = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("title cannot be empty")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters"),

  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("content cannot be empty"),

  body("status")
    .optional()
    .isIn(STATUSES)
    .withMessage("status must be draft or published"),

  body("tags").optional().isArray().withMessage("tags must be an array"),

  body("coverImage")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("coverImage must be a valid URL"),
];

const postIdRule = [param("postId").isMongoId().withMessage("invalid post id")];

const getPostsRules = [
  query("status")
    .optional()
    .isIn(STATUSES)
    .withMessage("status must be draft or published"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be between 1 and 100"),
];

module.exports = {
  createPostRules,
  updatePostRules,
  postIdRule,
  getPostsRules,
};
