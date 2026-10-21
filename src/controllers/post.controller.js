const Post = require("../models/post.model");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

const getPosts = asyncHandler(async (req, res, next) => {
  const query = req.query;

  const limit = Number(query.limit) || 10;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * limit;

  const { status } = query;
  let filter = {};
  if (status) {
    filter.status = status;
  }

  const posts = await Post.find(filter, { __v: false })
    .populate("author", "name")
    .limit(limit)
    .skip(skip);

  res
    .status(200)
    .json({ status: "success", results: posts.length, data: { posts } });
});

const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(new AppError("post not found", 404));
  }

  res.json({ status: "success", data: { post } });
});

const createPost = asyncHandler(async (req, res, next) => {
  const { title, content, status, tags } = req.body;

  const coverImage = req.file ? `uploads/covers/${req.file.filename}` : "";

  const newPost = await Post.create({
    title,
    content,
    status,
    tags,
    coverImage,
    author: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});

const updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return next(new AppError("post not found", 404));

  const isOwner = post.author.equals(req.user._id);
  if (!isOwner && req.user.role !== "admin") {
    return next(new AppError("you can only edit your own posts", 403));
  }

  const { title, content, status, tags } = req.body;
  const coverImage = req.file
    ? `uploads/covers/${req.file.filename}`
    : undefined;

  post.set({ title, content, status, tags, coverImage });
  await post.save();

  res.status(200).json({
    status: "success",
    message: "post updated successfully",
    data: { post },
  });
});

const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return next(new AppError("post not found", 404));

  const isOwner = post.author.equals(req.user._id);
  if (!isOwner && req.user.role !== "admin") {
    return next(new AppError("you can only delete your own posts", 403));
  }

  await post.deleteOne();
  res
    .status(200)
    .json({ status: "success", message: "post deleted successfully" });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
