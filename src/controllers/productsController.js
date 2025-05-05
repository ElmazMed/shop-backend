import Product from "../models/products.schema.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    productImg,
    quantity,
    variantName,
    variant,
    variantPrice,
    variantQuantity,
    variantImg,
  } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: "Please add a title" });
    }
    const productImgUpload = await cloudinary.uploader.upload(
      req.files.productImg[0].path
    );
    const variantImgUpload = await cloudinary.uploader.upload(
      req.files.variantImg[0].path
    );
    const newProduct = new Product({
      title,
      description,
      price,
      productImg: productImgUpload.secure_url,
      quantity,
      variantName,
      variant,
      variantPrice,
      variantQuantity,
      variantImg: variantImgUpload.secure_url,
    });
    await newProduct.save();
    return res.status(201).json({ newProduct });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products)
      return res.status(404).json({ message: "No products to show today!" });

    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found!" });

    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    let updatedImgs = { ...req.body };
    if (updatedImgs?.productImg) {
      const productImgUpload = await cloudinary.uploader.upload(
        req.files.productImg[0].path
      );
      updatedImgs.productImg = productImgUpload.secure_url;
    }
    if (updatedImgs?.variantImg) {
      const variantImgUpload = await cloudinary.uploader.upload(
        req.files.variantImg[0].path
      );
      updatedImgs.variantImg = variantImgUpload.secure_url;
    }
    const update = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      updatedImgs,
      {
        new: true,
      }
    );
    return res.status(200).json({ update });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Internal server error", error: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    return res.status(200).json({ message: "Product removed successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Internal server error", error: error.message });
  }
};
export { addProduct, getProducts, updateProduct, removeProduct, getOneProduct };
