import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import appRoutes from "./app.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   CORS CONFIG (PRODUCTION READY)
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL, // your Vercel frontend URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Blocked by CORS policy"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   DATABASE
========================= */
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* =========================
   ROUTES
========================= */
app.use("/api", appRoutes);

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});