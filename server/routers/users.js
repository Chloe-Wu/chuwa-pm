import { Router } from "express";
import { userSignUp, userSignIn } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/login", userSignIn);

userRouter.post("/signup", userSignUp);

userRouter.post("/increase_product/:id", );

userRouter.post("/decrease_product/:id", );

export default userRouter;
