import { Router } from "express";

const router = Router();

// This message should appear in the Render logs when the file is loaded
console.log("✅ products.js loaded");

// Test route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Products route is working!"
  });
});

// Test route with an ID
router.get("/:id", (req, res) => {
  res.json({
    success: true,
    message: `Product ID received: ${req.params.id}`
  });
});

export default router;
