

import cors from "cors";
import express from "express";
import connectDB from "./db/index.js";
import userRouter from "./routers/users.js";
import productRouter from "./routers/products.js";
import {} from "dotenv/config";



console.log(process.env.MONGODB_URI);



const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", productRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true,
}));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
