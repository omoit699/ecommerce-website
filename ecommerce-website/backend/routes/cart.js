import { Router } from "express";
import cartController from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, cartController.getCart.bind(cartController));

router.post(
  "/add",
  authMiddleware,
  cartController.addToCart.bind(cartController)
);

router.post(
  "/remove",
  authMiddleware,
  cartController.removeFromCart.bind(cartController)
);

router.put(
  "/update",
  authMiddleware,
  cartController.updateCart.bind(cartController)
);

export default router;