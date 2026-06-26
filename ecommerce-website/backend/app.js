import express from "express";
import cors from "cors";

// routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import checkoutRoutes from "./routes/checkout.js";
import inventoryRoutes from "./routes/inventory.js";

const app = express();

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://your-frontend-domain.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/inventory", inventoryRoutes);

export default app;