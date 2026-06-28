import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import orderRoutes from "./routes/orderRoutes.js";

const app = express(); // ✅ MUST COME FIRST

app.use(cors());
app.use(express.json());

// routes
app.use("/api/orders", orderRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
