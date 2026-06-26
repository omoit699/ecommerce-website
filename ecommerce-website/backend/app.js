import express from "express";

import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import checkoutRoutes from "./routes/checkout.js";
import authRoutes from "./routes/auth.js";
import inventoryRoutes from "./routes/inventory.js";

const app = express();

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);

export default app;