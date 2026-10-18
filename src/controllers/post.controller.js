const Post = require("../models/post.model");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();

  res.json({ status: "success", data: { posts } });
});

const getPost = async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(new AppError("post not found", 404));
  }

  res.json({ status: "success", data: { post } });
};

const createPost = async (req, res) => {};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
