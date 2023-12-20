import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const userSignUp = async (req, res) => {
  try {
    const { email, password, admin } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
    } else {
      // Create new user
      const user = new User({ email, password, admin });
      await user.save();
      // Create token
      const payload = { user: { id: user._id, admin } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(201).json({
        success: true,
        message: "User created",
        id: user._id,
        admin: user.admin,
        token,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Verify user
    const user = await User.findOne({ email, password });
    if (user) {
      // Create token
      const payload = { user: { id: user._id, admin: user.admin } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({
        success: true,
        message: "Login successful",
        id: user._id,
        admin: user.admin,
        token,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const cart = await User.findById(req.params?.id).cart;
    // Check if quantity in cart exceeds quantity in stock
    const success = cart.reduce(async (success, productInCart) => {
      const product = await Product.findById(productInCart._id);
      success = success && (productInCart.quantity < product.quantity);
      productInCart.quantity = Math.min(productInCart.quantity, product.quantity);
      return success;
    }, true)
    await cart.save();
    res.status(200).json({ success, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// export const addProduct = async (req, res) => {
//   const product = 
// }
