import Product from "../models/products.schema.js";

const addProduct = async (req, res) => {
  const { title, description, price, productImg } = req.body;
  try {
    if ((!title, !description, !price, !productImg)) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = new Product({ title, description, price, productImg });
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

    const update = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
