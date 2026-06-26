import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./app.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
connectDB();

const app = express();

/* 🔐 SECURITY MIDDLEWARE */
app.use(rateLimiter);

/* 🌍 CORS (PRODUCTION SAFE) */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend-domain.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

/* ROUTES */
app.use("/api", routes);

/* ERROR HANDLER */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});