const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("you are not logged in"));
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("user no longer exists", 401));
  }

  req.user = user;
  next();
});

const allowTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you do not have permission", 403));
    }

    next();
  };

module.exports = { protect, allowTo };
