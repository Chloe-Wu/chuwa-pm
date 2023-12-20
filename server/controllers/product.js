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
    const product = await Product.findById(req.params?.id);
    // Update name & verify name existence
    product.name = req.body.name ?? product.name;
    const existingProdcut = await Product.findOne({ name: product.name });
    if (existingProdcut && existingProdcut._id.toString() !== req.params?.id) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exists" });
    }
    // Update rest information
    product.description = req.body.description ?? product.description;
    product.category = req.body.category ?? product.category;
    product.price = req.body.price ?? product.price;
    product.quantity = req.body.quantity ?? product.quantity;
    product.imageUrl = req.body.imageUrl ?? product.imageUrl;
    product.updateTime = Date.now();
    // Save changes
    await product.save();
    res.status(200).json({ success: true, message: "Product updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params?.id);
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductList = async (req, res) => {
  try {
    // Query for the products by sort method and page number
    const { sort_by, page, perPage } = req.query;
    var products;
    switch (sort_by) {
      case "price_high":
        products = await Product.find()
          .sort({ price: -1 })
          .skip((page - 1) * perPage)
          .limit(perPage)
          .select("name price quantity imageUrl")
          .exec();
        break;
      case "price_low":
        products = await Product.find()
          .sort({ price: 1 })
          .skip((page - 1) * perPage)
          .limit(perPage)
          .select("name price quantity imageUrl")
          .exec();
        break;
      default:
        products = await Product.find()
          .sort({ updateTime: -1 })
          .skip((page - 1) * perPage)
          .limit(perPage)
          .select("name price quantity imageUrl")
          .exec();
    }
    // Get total number of pages
    const documentCount = await Product.countDocuments();
    const pages = Math.max(Math.ceil(documentCount / perPage), 1);
    // Not login, return products
    const { userID } = req.body;
    if (!userID) {
      return res.status(200).json({ success: true, pages, products });
    }
    // User is login, add cart information
    const userCart = await User.findById(userID).cart;
    products = products.map((product) => {
      // If product is in cart, check if quantity is still available
      let productInCart = userCart.some((item) => item._id === product._id);
      if (productInCart) {
        const productQuantity = Math.min(
          productInCart.quantity,
          product.quantity
        );
        const inCart = {
          status: productInCart.quantity === productQuantity,
          quantity: productQuantity,
        };
        // Update quantity in cart, if product out of stock, remove from cart
        if (productQuantity === 0) {
          userCart.splice(userCart.indexOf(productInCart), 1);
        } else {
          productInCart.quantity = productQuantity;
        }
        return { ...product, inCart };
      }
      return product;
    });
    // Save user cart
    await userCart.save();
    res.status(200).json({ success: true, pages, products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
