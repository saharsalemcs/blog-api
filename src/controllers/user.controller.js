const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const AppError = require("../utils/appError");

const getUsers = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const users = await User.find().limit(limit).skip(skip);

  res
    .status(200)
    .json({ status: "success", length: users.length, data: { users } });
});

const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new AppError("user not found", 404));
  }

  res.status(200).json({ status: "success", data: { user } });
});

const updateMe = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  const user = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  );

  res.status(200).json({ status: "success", data: { user } });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const result = await User.deleteOne({ _id: req.params.userId });
  if (result.deletedCount === 0)
    return next(new AppError("user not found", 404));

  res
    .status(200)
    .json({ status: "success", message: "user deleted successfully" });
});

module.exports = { getUsers, getUser, updateMe, deleteUser };
