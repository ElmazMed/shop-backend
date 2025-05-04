import dotenv from "dotenv";
import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import authRoutes from "./routes/authRoute.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(ExpressMongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later",
});
app.use(limiter);
// app.use(csurf());

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err));

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
