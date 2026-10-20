const express = require("express");
const postControllers = require("../controllers/post.controller");
const {
  getPostsRules,
  createPostRules,
  postIdRule,
  updatePostRules,
} = require("../validators/post.validator");
const validate = require("../middlewares/validate");
const { protect } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .get(getPostsRules, validate, postControllers.getPosts)
  .post(protect, createPostRules, validate, postControllers.createPost);

router
  .route("/:postId")
  .get(postIdRule, validate, postControllers.getPost)
  .patch(
    protect,
    postIdRule,
    updatePostRules,
    validate,
    postControllers.updatePost,
  )
  .delete(protect, postIdRule, validate, postControllers.deletePost);

module.exports = router;
