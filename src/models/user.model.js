const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      minLength: [2, "name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [
        validator.isEmail,
        validator.isLowercase,
        "enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "password is missing"],
      minlength: [6, "password should be 6 characters at least"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "role must be user or admin",
      },
      default: "user",
    },
    avatar: { type: String, default: "uploads/profile.jpg" },
  },
  { timestamps: true },
);

// hash before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);
