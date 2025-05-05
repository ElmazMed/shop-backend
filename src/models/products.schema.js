import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      minLength: [2, "Title is too short"],
      trim: true,
    },
    description: {
      type: String,
      minLength: [2, "Description is too short"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      default: 0,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 1,
      trim: true,
    },
    productImg: {
      type: String,
      required: [true, "Please add an image"],
    },
    variantName: {
      type: String,
      trim: true,
      default: "",
    },
    variant: {
      type: String,
      trim: true,
      default: "",
    },
    variantPrice: {
      type: Number,
      trim: true,
      default: 0,
    },
    variantQuantity: {
      type: Number,
      trim: true,
      default: 0,
    },
    variantImg: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
