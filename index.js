require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/config/db");
const postsRouter = require("./src/routes/posts.route");
const userRouter = require("./src/routes/auth.route");
const usersRouter = require("./src/routes/users.route");
const AppError = require("./src/utils/appError");
const path = require("path");
const globalErrorHandler = require("./src/middlewares/errorHandler");

// connect to mongo db atlas
connectDB();

app.use(express.json());

// Global error handler
app.use(globalErrorHandler);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// router handler
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", userRouter);

// route not exist
app.all("/*splat", (req, res, next) => {
  next(new AppError("this route is not available on the server", 404));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
