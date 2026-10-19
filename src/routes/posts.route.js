const express = require("express");
const postControllers = require("../controllers/post.controller");
const {
  getPostsRules,
  createPostRules,
  postIdRule,
  updatePostRules,
} = require("../validators/post.validator");
const validate = require("../middlewares/validate");
const router = express.Router();

router
  .route("/")
  .get(getPostsRules, validate, postControllers.getPosts)
  .post(createPostRules, validate, postControllers.createPost);

router
  .route("/:postId")
  .get(postIdRule, validate, postControllers.getPost)
  .patch(postIdRule, updatePostRules, validate, postControllers.updatePost)
  .delete(postIdRule, validate, postControllers.deletePost);

module.exports = router;
