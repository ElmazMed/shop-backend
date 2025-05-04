import express from "express";
import {
  addProduct,
  getOneProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productsController.js";
import { protectRoutes } from "../middleware/protect.js";

const router = express.Router();

router
  .post("/add-product", protectRoutes, addProduct)
  .get("/", getProducts)
  .get("/:id", getOneProduct)
  .put("/:id", protectRoutes, updateProduct)
  .delete("/:id", protectRoutes, removeProduct);

export default router;
