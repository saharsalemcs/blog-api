const express = require("express");
const postControllers = require("../controllers/post.controller");
const router = express.Router();

router.route("/").get(postControllers.getPosts);

router.route("/:postId").get(postControllers.getPost);

module.exports = router;
