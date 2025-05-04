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
    productImg: {
      type: String,
      required: [true, "Please add an image"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
