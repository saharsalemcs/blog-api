require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/config/db");
const postsRouter = require("./src/routes/posts.route");
const AppError = require("./src/utils/appError");

// connect to mongo db atlas
connectDB();

// router handler
app.use("/api/posts", postsRouter);

// route not exist
app.use("/*splat", (req, res, next) => {
  next(new AppError("this route is not available on the server", 404));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status || "error",
    message: err.isOperational ? err.message : "Something went wrong",
    code: statusCode,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
