import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";

export const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(404)
        .json({ message: "Unauthorized - Token not found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in the protect route ${error.message}`);
    res.status(400).json({ message: error });
  }
};
