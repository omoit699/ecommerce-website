import { Router } from "express";
import checkoutController from "../controllers/checkoutController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  checkoutController.processOrder.bind(checkoutController)
);

export default router;