const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const generateToken = require("../utils/generateToken");
const User = require("../models/user.model");

const register = asyncHandler(async (req, res, next) => {
  // validation with express-validator __ request level
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((e) => e.msg)
      .join(", ");
    return next(new AppError(message, 400));
  }

  const { name, email, password } = req.body;
  console.log("req.file ->", req.file);

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return next(new AppError("user already exists", 400));
  }

  const user = await User.create({ name, email, password });

  const token = await generateToken(user._id);
  user.password = undefined;

  res.status(201).json({ status: "success", token, data: { user } });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("invalid email or password", 401));
  }

  const token = await generateToken(user._id);
  user.password = undefined;

  res.status(200).json({ status: "success", token, data: { user } });
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: { user: req.user } });
});

module.exports = {
  register,
  login,
  getMe,
};
