import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import productsRoutes from "./routes/productsRoutes.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later",
});
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err));

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
