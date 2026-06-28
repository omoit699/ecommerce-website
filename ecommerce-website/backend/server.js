import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import inventoryRoutes from "./routes/inventory.js";
import checkoutRoutes from "./routes/checkout.js";
import orderRoutes from "./routes/orderRoutes.js";

app.use("/api/orders", orderRoutes);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/checkout", checkoutRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-Commerce API is running",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
