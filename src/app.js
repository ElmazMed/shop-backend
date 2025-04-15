import dotenv from "dotenv";
import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(ExpressMongoSanitize());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err));

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
