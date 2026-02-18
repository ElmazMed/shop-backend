import { generateToken } from "../middleware/generateToken.js";
import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const userExists = await User.findOne({ email, username });
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please add your email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "invalid credentials" });

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id, res);

    return res.status(201).json({
      id: user._id,
      email,
      username: user.username,
    });
  } catch (error) {
    console.error("Error in the Login controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", " ", { maxAge: 0 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in the Logout controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { register, login, logout };
