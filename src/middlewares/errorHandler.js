const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    err = new AppError(message, 400);
  }

  if (err.name === "MulterError") {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "file is too large (max 2MB)"
        : err.code === "LIMIT_UNEXPECTED_FILE"
          ? `unexpected file field: ${err.field}`
          : err.message;
    err = new AppError(message, 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = new AppError(`${field} already exists`, 409);
  }

  if (err.name === "JsonWebTokenError") {
    err = new AppError("invalid token, please log in again", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new AppError("token expired, please log in again", 401);
  }

  if (err.type === "entity.parse.failed") {
    err = new AppError("invalid JSON in request body", 400);
  }

  const statusCode = err.statusCode || 500;
  if (!err.isOperational) console.error(err);

  res.status(statusCode).json({
    status: err.status || "error",
    message: err.isOperational ? err.message : "Something went wrong",
    code: statusCode,
  });
};
