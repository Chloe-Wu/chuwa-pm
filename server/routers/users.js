import { Router } from "express";
import { userAuth } from "../authentication/auth.js";
import {
  userSignUp,
  userSignIn,
  addProduct,
  increaseProduct,
  decreaseProduct,
  removeProduct,
  getUserCart,
  checkout,
  getUserProps,
  getUserIsAdmin
} from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/login", userSignIn);

userRouter.post("/signup", userSignUp);

userRouter.post("/user_add_product/:id", userAuth, addProduct);

userRouter.post("/user_increase_product/:id", userAuth, increaseProduct);

userRouter.post("/user_decrease_product/:id", userAuth, decreaseProduct);

userRouter.delete("/user_remove/:id", userAuth, removeProduct);

userRouter.get("/user_cart", userAuth, getUserCart)

userRouter.post("/user_checkout", userAuth, checkout);

userRouter.get("/user_get_props", userAuth, getUserProps);

userRouter.get("/user_get_admin", userAuth, getUserIsAdmin);

export default userRouter;
