import { generateToken } from "../middleware/generateToken.js";
import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already registred" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    generateToken(newUser._id, res);
    return res.status(201).json({ id: newUser._id, username, email });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");

    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { register };
