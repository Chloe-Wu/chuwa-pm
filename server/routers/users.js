import { Router } from "express";
import {
  userSignUp,
  userSignIn,
  addProduct,
  increaseProduct,
  decreaseProduct,
  checkout,
} from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/login", userSignIn);

userRouter.post("/signup", userSignUp);

userRouter.post("/user_add_product/:id", addProduct);

userRouter.post("/user_increase_product/:id", increaseProduct);

userRouter.post("/user_decrease_product/:id", decreaseProduct);

userRouter.post("/checkout", checkout);

export default userRouter;
