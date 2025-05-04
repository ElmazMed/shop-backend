import express from "express";
import { login, register, logout } from "../controllers/authControllers.js";

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/logout", logout);

export default router;
