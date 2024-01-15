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
    // If user login and product in user cart, show cart quantity
    const { userID } = req.body;
    const login = userID ? true : false;
    if (userID) {
      const user = await User.findById(userID);
      const cart = user.cart;
      const target = cart.find(
        (item) => item.product.toString() === product.id
      );
      // Check for cart quantity and stock quantity
      if (target) {
        const productQuantity = Math.min(target.quantity, product.quantity);
        const inCart = {
          status: target.quantity === productQuantity,
          quantity: productQuantity,
        };
        // Update quantity in cart, if product out of stock, remove from cart
        if (productQuantity === 0) {
          cart.splice(cart.indexOf(target), 1);
        } else {
          target.quantity = productQuantity;
        }
        await user.save();
        return res.status(200).json({ success: true, product, inCart, login });
      }
    }
    res.status(200).json({ success: true, product, login });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductList = async (req, res) => {
  try {
    const { sort_by: sortBy, page, perPage, search } = req.query;
    console.log('Received Search Term:', search);
    const skipItems = (page - 1) * perPage;

    let query = Product.find();

    // Apply sorting based on sortBy parameter
    switch (sortBy) {
      case "price_high":
        query = query.sort({ price: -1 });
        break;
      case "price_low":
        query = query.sort({ price: 1 });
        break;
      default:
        query = query.sort({ updateTime: -1 });
    }

    // Apply search filter if search term is provided
    if (search) {
      // query = query.regex("name", new RegExp(search, "i"));
      const search = req.query.search;
      console.log('Search Term:', search);

      query = query.regex("name", new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i"));

    }

    const products = await query
        .skip(skipItems)
        .limit(perPage)
        .select("name price quantity imageUrl")
        .exec();

    const documentCount = await Product.countDocuments();
    const pages = Math.max(Math.ceil(documentCount / perPage), 1);

    const { userID } = req.body;
    const login = userID ? true : false;

    if (!userID) {
      return res.status(200).json({ success: true, pages, products, login });
    }

    const user = await User.findById(userID);
    const cart = user.cart;
    const updatedProducts = products.map((product) => {
      const target = cart.find((item) => item.product.toString() === product.id);
      if (target) {
        const productQuantity = Math.min(target.quantity, product.quantity);
        const inCart = {
          status: target.quantity === productQuantity,
          quantity: productQuantity,
        };
        if (productQuantity === 0) {
          cart.splice(cart.indexOf(target), 1);
        } else {
          target.quantity = productQuantity;
        }
        return { ...product._doc, inCart };
      }
      return product._doc;
    });

    await user.save();
    res.status(200).json({ success: true, pages, products: updatedProducts, login });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};