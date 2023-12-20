import { Router } from "express";
import { createProduct, updateProduct, getOneProduct, getProductList } from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/product/:id", getOneProduct);

productRouter.get("/products", getProductList);

productRouter.post("/create_product", createProduct);

productRouter.post("/update_product/:id", updateProduct);

export default productRouter;
