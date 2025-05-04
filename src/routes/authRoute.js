import express from "express";
import { login, register } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", register).post("/login", login);

export default router;
