import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// ROUTES
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express(); // MUST be first

console.log("SERVER VERSION: 28 JUNE TEST");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// TEST ROUTE (ROOT)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

// START SERVER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
