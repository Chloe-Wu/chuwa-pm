import express from "express";
import pkg from "body-parser";
import connectDB from "./db/index.js";
import { userSignUp, userSignIn } from "./controllers/user.js";
import { createProduct } from "./controllers/product.js";
import {} from "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(pkg.json());

// Connect to MongoDB
connectDB();

// Login endpoint
app.post("/api/login", userSignIn);

// Signup endpoint
app.post("/api/signup", userSignUp);

app.post("/api/add_product", createProduct);

// Other CRUD endpoints...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
