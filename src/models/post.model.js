const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minLength: [3, "title must be at least 3 characters"],
    },
    content: { type: String, required: [true, "content is required"] },
    coverImage: { type: String, default: "" },
    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message: "post status should be draft or published",
      },
      default: "draft",
    },
    tags: { type: [String], default: [] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "author is required"],
    },
  },
  {
    timestamps: true, // createdAt , updatedAt
  },
);

module.exports = mongoose.model("Post", postSchema);
