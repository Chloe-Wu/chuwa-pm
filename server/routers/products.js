import { Router } from "express";
import { adminAuth, loginAuth } from "../authentication/auth.js";
import {
  createProduct,
  updateProduct,
  getOneProduct,
  getProductList,
} from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/products", loginAuth, getProductList);

productRouter.get("/product/:id", loginAuth, getOneProduct);

productRouter.post("/create_product", adminAuth, createProduct);

productRouter.post("/update_product/:id", adminAuth, updateProduct);




export default productRouter;