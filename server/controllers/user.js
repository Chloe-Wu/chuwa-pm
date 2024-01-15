import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getUserProps = async (req, res) => {
  try {
    const user = await User.findById(req.body.userID);
    const table = {
      email: user.email,
      password: user.password,
      admin: user.admin,
      cart: user.cart,
    };
    console.log("Returning a user table");
    res.status(201).json({ success: true, message: "User props getting", table});
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const getUserIsAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.body.userID);
    console.log("Returning if a user is admin");
    res.status(201).json({ success: true, message: "User admin getting", admin: user.admin});
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

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
        token,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params?.id);
    // Check out of stock
    if (product.quantity === 0) {
      return res.status(400).json({ success: false, message: "Out of stock" });
    }
    const user = await User.findById(req.body.userID);
    const cart = user.cart;
    // Prevent hack: check if product already exists in cart
    // if (cart && cart.some((item) => item.product.toString() === product.id)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Product already exists in cart" });
    // }
    // Add product into cart
    const target = { product: product.id, quantity: 1 };
    const status =
      target.quantity === product.quantity ? "Reach maximum" : "Good";
    cart.push(target);
    await user.save();
    res.status(200).json({ success: true, status, quantity: target.quantity });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const increaseProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params?.id);
    const user = await User.findById(req.body.userID);
    const cart = user.cart;
    const target = cart.find((item) => item.product.toString() === product.id);
    // Check out of stock
    if (product.quantity === 0) {
      cart.splice(cart.indexOf(target), 1);
      await user.save();
      return res.status(400).json({ success: false, message: "Out of stock" });
    }
    // Increase product quantity by 1
    const newQuantity = target.quantity + 1;
    const status =
      newQuantity > product.quantity
        ? "Exceed maximum"
        : newQuantity === product.quantity
        ? "Reach maximum"
        : "Good";
    target.quantity = Math.min(newQuantity, product.quantity);
    await user.save();
    res.status(200).json({ success: true, status, quantity: target.quantity });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const decreaseProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params?.id);
    const user = await User.findById(req.body.userID);
    const cart = user.cart;
    const target = cart.find((item) => item.product.toString() === product.id);
    // Check out of stock
    if (product.quantity === 0) {
      cart.splice(cart.indexOf(target), 1);
      await cart.save();
      return res.status(400).json({ success: false, message: "Out of stock" });
    }
    // Decrease product quantity by 1
    var newQuantity = target.quantity - 1;
    var status = "Good";
    if (newQuantity < 0) {
      // Prevent hack: check if new quantity less than 0
      return res
        .status(400)
        .json({ success: false, message: "Quantity less than 0" });
    } else if (newQuantity === 0) {
      status = "Reach 0";
      cart.splice(cart.indexOf(target), 1);
    } else if (newQuantity > product.quantity) {
      status = "Exceed maximum";
      newQuantity = product.quantity;
    } else if (newQuantity === product.quantity) {
      status = "Reach maximum";
    }
    target.quantity = newQuantity;
    await user.save();
    res.status(200).json({ success: true, status, quantity: target.quantity });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const user = await User.findById(req.body.userID);
    const cart = user.cart;
    const target = cart.find(
      (item) => item.product.toString() === req.params?.id
    );
    if (target) {
      cart.splice(cart.indexOf(target), 1);
    }
    await user.save();
    res.status(200).json({ success: true, message: "Remove from cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const user = await User.findById(req.body.userID);
    const cart = user.cart;
    // Check if quantity in cart exceeds quantity in stock
    const valid = await Promise.all(
      cart.map(async (target) => {
        const product = await Product.findById(target.product);
        const isValid =
          target.quantity <= product.quantity && product.quantity > 0;
        target.quantity = Math.min(target.quantity, product.quantity);
        return isValid;
      })
    );
    const success = valid.every((isValid) => isValid);
    // Remove products that are out of stock
    if (!success) {
      user.cart = cart.filter((product) => {
        return product.quantity > 0;
      });
    }
    // Remove products that are out of stock
    if (!success) {
      user.cart = cart.filter((product) => {
        return product.quantity > 0;
      });
    }
    await user.save();
    res.status(200).json({ success, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const checkout = async (req, res) => {
  try {
    const user = await User.findById(req.body.userID);
    const cart = user.cart;
    // Check if quantity in cart exceeds quantity in stock
    const valid = await Promise.all(
      cart.map(async (target) => {
        const product = await Product.findById(target.product);
        const isValid =
          target.quantity <= product.quantity && product.quantity > 0;
        target.quantity = Math.min(target.quantity, product.quantity);
        return isValid;
      })
    );
    const success = valid.every((isValid) => isValid);
    // If nothing goes wrong, checkout
    if (success) {
      cart.forEach(async (target) => {
        const product = await Product.findById(target.product);
        product.quantity = product.quantity - target.quantity;
        await product.save();
      });
      user.cart = [];
    } else {
      // Remove products that are out of stock
      user.cart = cart.filter((product) => {
        return product.quantity > 0;
      });
    }
    await user.save();
    res.status(200).json({ success, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};