import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please add a username"],
      trim: true,
      minLength: [3, "username is too short"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add a valid email"],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please add a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please add a strong password"],
      minLength: [6, "Password must be at least 6 characters"],
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
