import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  quantity: Number,
  imageUrl: String,
  updateTime: Date,
});

const Product = model("Product", productSchema);

export default Product;

