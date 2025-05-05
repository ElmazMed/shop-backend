import express from "express";
import {
  addProduct,
  getOneProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productsController.js";
import { protectRoutes } from "../middleware/protect.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router
  .post(
    "/add-product",
    protectRoutes,
    upload.fields([
      { name: "productImg", maxCount: 1 },
      { name: "variantImg", maxCount: 1 },
    ]),
    addProduct
  )
  .get("/", getProducts)
  .get("/:id", getOneProduct)
  .put(
    "/:id",
    protectRoutes,
    upload.fields([
      { name: "productImg", maxCount: 1 },
      { name: "variantImg", maxCount: 1 },
    ]),
    updateProduct
  )
  .delete("/:id", protectRoutes, removeProduct);

export default router;
