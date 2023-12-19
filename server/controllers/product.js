import User from "../models/User.js";
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    // Check if the product already exists
    const existingProdcut = await Product.findOne({ name });
    if (existingProdcut) {
      res
        .status(400)
        .json({ success: false, message: "Product already exists" });
    } else {
      // Create new product
      const product = new Product(req.body);
      product.updateTime = Date.now();
      await product.save();
      // Create token
      res.status(201).json({ success: true, message: "Product created" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = new Product(req.params?.id);
    // Update product information & date
    product.name = req.body.name ?? product.name;
    // Check name existence
    const existingProdcut = await Product.find({ name: product.name });
    existingProdcut.forEach(({ id }) => {
      console.log(id);
    });
    product.description = req.body.description ?? product.description;
    product.category = req.body.category ?? product.category;
    product.price = req.body.price ?? product.price;
    product.quantity = req.body.quantity ?? product.quantity;
    product.imageUrl = req.body.imageUrl ?? product.imageUrl;
    product.updateTime = Date.now();
    // Save changes
    // await product.save();
    res.status(200).json({ success: true, message: "Product updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const product = new Product(req.params?.id);
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// export const getProductList = async (req, res) => {
//   try {
//     const { ref, page, perpage } = req.query;

//     res.status(200).json({ success: true, products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Server Error' })
//   }
// }
