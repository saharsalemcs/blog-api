const express = require("express");
const postControllers = require("../controllers/post.controller");
const router = express.Router();

router
  .route("/")
  .get(postControllers.getPosts)
  .post(postControllers.createPost);

router
  .route("/:postId")
  .get(postControllers.getPost)
  .patch(postControllers.updatePost)
  .delete(postControllers.deletePost);

module.exports = router;
