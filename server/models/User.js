import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: String,
  password: String,
  admin: Boolean,
  cart: [
    {
      product: Schema.Types.ObjectId,
      quantity: Number,
      price: Number,
    },
  ],
});

const User = model("User", userSchema);

export default User;
