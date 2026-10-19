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
    // if (!["draft", "published"].includes(status)) {
    //   return next(new AppError("status must be draft or published", 400));
    // }

    filter.status = status;
  }

  const posts = await Post.find(filter, { __v: false }).limit(limit).skip(skip);
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
  const { title, content, status, tags, coverImage } = req.body;
  const newPost = await Post.create({
    title,
    content,
    status,
    tags,
    coverImage,
  });

  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});

const updatePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $set: { ...req.body } },
    { new: true, runValidators: true },
    // runValidators => apply schema validation rules on the updated post
  );

  if (!updatedPost) {
    return next(new AppError("post not found", 404));
  }

  res
    .status(200)
    .json({
      status: "success",
      message: "post updated successfully",
      data: { post: updatedPost },
    });
});

const deletePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const result = await Post.deleteOne({ _id: postId });

  if (result.deletedCount === 0) {
    return next(new AppError("post not found", 404));
  }
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
